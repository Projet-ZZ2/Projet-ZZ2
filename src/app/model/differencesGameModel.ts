export interface DifferencesGameModel {
    id: number;
    label: string;
    type: 'file' | 'system' | 'folder';
    isResolved?: boolean;
    isLocked?: boolean;
    content: {
        title: string;
        instructions: string;
        buggyCode: string;
        correctCode: string;
        language: string;
        errorsFound: string[];
    } | null;
}
