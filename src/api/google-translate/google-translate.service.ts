import { Injectable } from '@nestjs/common';

import { Observable, from, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import * as translate from 'google-translate-api';

import { GoogleTranslateOptions } from './google-translate-options';
import { GoogleTranslateResult, GoogleTranslateAlternative } from './google-translate-result';

@Injectable()
export class GoogleTranslateService {
  public constructor() {
  }

  public translate(text: string, options: GoogleTranslateOptions): Observable<GoogleTranslateResult> {
    return from(translate(text, Object.assign({}, options, { raw: true })))
      .pipe(map((result: any) => Object.assign(result, this.extractRaw(result.raw))));
  }

  private extractRaw(unparsedRaw: any): Partial<GoogleTranslateResult> {
    if (!unparsedRaw) {
      return {};
    }

    try {
      const raw = JSON.parse(unparsedRaw);
      return {
        alternatives: this.extractAlternativesFromRaw(raw),
        confidence: this.extractConfidenceFromRaw(raw),
        seeAlso: this.extractSeeAlsoFromRaw(raw)
      };
    } catch (error) {
      return {};
    }
  }

  private extractAlternativesFromRaw(raw: any): GoogleTranslateAlternative[] {
    if (!Array.isArray(raw) || raw.length < 5) {
      return undefined;
    }

    if (!Array.isArray(raw[5]) || raw[5].length === 0) {
      return undefined;
    }

    if (!Array.isArray(raw[5][0]) || raw[5][0].length < 2) {
      return undefined;
    }

    if (!Array.isArray(raw[5][0][2])) {
      return undefined;
    }

    return raw[5][0][2].map((alternative) => ({
      text: alternative[0],
      score: alternative[1]
    }));
  }

  private extractConfidenceFromRaw(raw: any): number {
    if (!Array.isArray(raw) || raw.length < 6) {
      return undefined;
    }

    if (isNaN(parseFloat(raw[6])) || !isFinite(raw[6])) {
      return undefined;
    }

    return raw[6];
  }

  private extractSeeAlsoFromRaw(raw: any): string[] {
    if (!Array.isArray(raw) || raw.length < 14) {
      return undefined;
    }

    if (!Array.isArray(raw[14]) || raw[14].length === 0) {
      return undefined;
    }

    return raw[14][0];
  }
}
