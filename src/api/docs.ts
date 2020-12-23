class DocsApi {
    public async getJSONFromURL(url: string): Promise<Record<string, any>> {
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
