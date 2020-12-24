import { DocumentationResponse } from '@/api/types/documentation';
import { Documentation } from '@/common/types/documentation';

class DocsApi {
    public async getDocsFromURL(url: string): Promise<Documentation> {
        try {
            const response = (await (await fetch(url)).json()) as DocumentationResponse;
            return new Documentation(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new DocsApi();
