import RNFS from 'react-native-fs';

export const convertImageToBase64 = async (uri: string): Promise<string> => {
    return await RNFS.readFile(uri, 'base64');
};