import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as deepl from 'deepl-node';

@Injectable()
export class TranslatorService {
  private readonly translator: deepl.Translator;

  constructor(private configService: ConfigService) {
    const deeplApiKey = this.configService.get<string>('DEEPL_API_KEY');
    this.translator = new deepl.Translator(deeplApiKey);
  }

  async translate(
    text: string,
    sourceLang: deepl.SourceLanguageCode | null,
    targetLang: deepl.TargetLanguageCode,
  ) {
    const result = await this.translator.translateText(
      text,
      sourceLang,
      targetLang,
    );

    return result.text;
  }
}
