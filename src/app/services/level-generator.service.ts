import { Injectable } from '@angular/core';

export type TokenType = 'keyword' | 'function' | 'string' | 'number' | 'comment' | 'plain' | 'operator';

export interface CodeToken {
  text: string;
  type: TokenType;
  id: string; // Unique ID to check if this is the winner
  isWhitespace: boolean;
}

export interface GameLevel {
  id: number;
  name: string;
  description: string; // e.g., "Find the memory leak variable"
  targetId: string; // The ID of the token that wins the level
  codeLines: CodeToken[][]; // Array of lines, each line is an array of tokens
}

@Injectable({
  providedIn: 'root'
})
export class LevelGeneratorService {

  // A mini-lexer regex to split code into tokens
  // Captures: Comments, Strings, Numbers, Words, Punctuation, Whitespace
  private tokenRegex = /(\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+\b|[a-zA-Z_$][a-zA-Z0-9_$]*|[{}()\[\].,:;+\-*/%&|^!=<>?~]|\s+)/g;

  private keywords = new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 
    'class', 'import', 'export', 'from', 'public', 'private', 'interface', 
    'type', 'implements', 'extends', 'new', 'this', 'true', 'false', 'null', 'undefined'
  ]);

  generateLevel(
    id: number,
    name: string,
    description: string,
    rawCode: string,
    winningText: string // The exact text the user needs to click
  ): GameLevel {

    const lines = rawCode.split('\n');
    const codeLines: CodeToken[][] = [];
    const targetId = `target_${id}`;
    let targetFound = false;

    lines.forEach((line, lineIndex) => {
      const tokens: CodeToken[] = [];
      
      // Match all tokens in the line
      const matches = line.match(this.tokenRegex) || [];

      matches.forEach((text, tokenIndex) => {
        const tokenId = `L${lineIndex}_T${tokenIndex}`;
        
        // Determine type for styling
        let type: TokenType = 'plain';
        const isWhitespace = /^\s+$/.test(text);

        if (!isWhitespace) {
            if (this.keywords.has(text)) type = 'keyword';
            else if (text.startsWith('//') || text.startsWith('/*')) type = 'comment';
            else if (text.startsWith('"') || text.startsWith("'")) type = 'string';
            else if (/^\d+$/.test(text)) type = 'number';
            else if (/^[a-zA-Z_$]/.test(text)) type = 'function'; // broad assumption for coloring text
            else if (!/^\s+$/.test(text)) type = 'operator'; // punctuation
        }

        // Check if this is the winner
        // We trim whitespace to ensure strict matching isn't ruined by spaces
        let isTarget = text === winningText;
        
        // Fail-safe: If the winning text didn't appear yet, and this matches, set it.
        // If there are multiple occurrences, this logic picks the first one (or you can customize).
        if (isTarget && !targetFound) {
            targetFound = true;
            tokens.push({ text, type, id: targetId, isWhitespace }); 
        } else {
            tokens.push({ text, type, id: tokenId, isWhitespace });
        }
      });

      codeLines.push(tokens);
    });

    if (!targetFound) {
      console.warn(`Warning: Winning text "${winningText}" was not found in the provided code snippet.`);
    }

    return { id, name, description, targetId, codeLines };
  }
}