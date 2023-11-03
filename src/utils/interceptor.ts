export const interceptor = (response: any) => {
    console.log(response)
    return response?.data;
}