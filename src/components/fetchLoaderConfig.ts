import { UnityLoaderConfig } from 'react-unity-renderer';

export async function fetchLoaderConfig(
  baseUrl: string
): Promise<UnityLoaderConfig> {
  // set the URL of where we expect the loader config to be
  const url = `${baseUrl}/unity/UnityBuildSize.json`;

  let response: Response | undefined;

  // network or request error
  try {
    response = await window.fetch(url, { method: 'GET' });
  } catch (ex) {
    throw new Error('unable to load build info');
  }

  // invalid response
  if (!response || !response.ok) throw new Error('unable to load build info');

  // force the type we expect
  const data = (await response.json()) as UnityLoaderConfig;

  return {
    loaderUrl: `${baseUrl}/${data.loaderUrl}`,
    frameworkUrl: `${baseUrl}/${data.frameworkUrl}`,
    codeUrl: `${baseUrl}/${data.codeUrl}`,
    dataUrl: `${baseUrl}/${data.dataUrl}`,
    memoryUrl: `${baseUrl}/${data.memoryUrl}`,
    symbolsUrl: `${baseUrl}/${data.symbolsUrl}`,
    streamingAssetsUrl: `${baseUrl}/${data.streamingAssetsUrl}`,
    companyName: `${data.companyName}`,
    productName: `${data.productName}`,
    productVersion: `${data.productVersion}`,
  };
}