import QRCode from 'qrcode';
import { QRFormData, QRCodeData } from './types';

export async function generateQRCode(data: QRFormData): Promise<QRCodeData> {
  const jsonString = JSON.stringify({
    CompanyName: data.CompanyName,
    TemporaryToken: data.TemporaryToken,
    BASEAPIURL: data.BASEAPIURL,
  });

  // High error correction for scanner reliability
  const dataUrl = await QRCode.toDataURL(jsonString, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    width: 512,
    margin: 4,
  });

  return { dataUrl, jsonString };
}
