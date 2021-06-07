import { Component, Input, OnInit } from '@angular/core';

enum KeyValueCompiledValueTypes {
  GRADIENT_COLOR,
  COLOR,
  STRING,
  ARRAY,
  ASSET,
  LINK,
}

interface IKeyValueCompiledData extends IKeyValue {
  type?: KeyValueCompiledValueTypes;
}

const COLOR_PATTERN = /^(rgb\(.*\)|rgba\(.*\)|#.{3,8}|black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey)$/;
const ASSET_PATTERN = /^(assets\/).*/;
const COLOR_PROP_NAME_PATTERN = /(color|Color)/;

export interface IKeyValue {
  key: string;
  value: string | Array<string>;
  link?: Array<any>;
}

@Component({
  selector: 'ta-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnInit {
  public readonly KeyValueCompiledValueTypes = KeyValueCompiledValueTypes;

  private _compiledData: IKeyValueCompiledData;
  get compiledData() { return this._compiledData; }

  @Input() set data(v: IKeyValue) {
    if (this._compiledData !== v) {
      let type: KeyValueCompiledValueTypes;
      if (typeof v.value === "string") {
        if (COLOR_PATTERN.test(v.value)) {
          type = KeyValueCompiledValueTypes.COLOR;
        } else if (ASSET_PATTERN.test(v.value)) {
          type = KeyValueCompiledValueTypes.ASSET;
        } else {
          type = KeyValueCompiledValueTypes.STRING;
        }
      } else if (v.value instanceof Array) {
        if (COLOR_PROP_NAME_PATTERN.test(v.key)) {
          type = KeyValueCompiledValueTypes.GRADIENT_COLOR;
        } else {
          type = KeyValueCompiledValueTypes.ARRAY;
        }
      }
      this._compiledData = { ...v, type };
    }
  }

  get gradientStyle() {
    if (this._compiledData.value instanceof Array) {
      return `linear-gradient(90deg, ${this._compiledData.value.map(c => c).join(", ")})`;
    }

    return undefined;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
