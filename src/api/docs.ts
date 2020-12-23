import Documentation from '@/api/types/documentation';

class DocsApi {
    public async getJSONFromURL(url: string): Promise<Documentation> {
        try {
            const response = await (await fetch(url)).json();
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new DocsApi();
