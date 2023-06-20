import VisualElement from "../visual_element.class.js";
import { IWordSettings, DefaultWordSettings } from "../default_settings.interface.js";
import { IWordStyles, DefaultWordStyles } from "../default_styles.interface.js";

class Word extends VisualElement {
    constructor(settings : IWordSettings, styles : IWordStyles) {
        super();
        this.initializeSettingsAndStyles<IWordSettings, IWordStyles>(
            settings,
            styles,
            DefaultWordSettings,
            DefaultWordStyles,
        );
    }
}

export default Word;