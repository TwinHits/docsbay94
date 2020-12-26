import { DocumentationResponse } from '@/api/types/documentation';
import { Documentation } from '@/common/types/documentation';

const LOCAL_STORAGE_KEY = 'docs-bay-94-docs';
const localStorage = window.localStorage;

class DocsApi {
    public async getDocsFromURL(url: string): Promise<Documentation> {
        try {
            const documentationResponse = await (await fetch(url)).json();
            const documentation = new Documentation(documentationResponse);
            this.writeDocsToLocalStorage(documentation);
            return documentation;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getDocsFromLocalStorage(): Promise<Documentation | undefined> {
        try {
            const documentationJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (documentationJSON && documentationJSON !== 'undefined') {
                return new Documentation(JSON.parse(documentationJSON));
            } else {
                return undefined;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async writeDocsToLocalStorage(documentation: Documentation): Promise<void> {
        try {
            return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documentation));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async downloadDocsFromLocalStorage() {
        const documentation = await this.getDocsFromLocalStorage();
        const filename = 'documentation.json';
        const blob = new Blob([JSON.stringify(documentation)], { type: 'text/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }
}

export default new DocsApi();
