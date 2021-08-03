import * as _CSS from 'csstype';

declare global {
    interface EventConfig {
        /**
         * Delays invoking event until specified time has elapsed since the last time the debounced function was invoked.
         * You can provide `number` of milliseconds to delay or some advanced options.
         */
        debounce?: number | {
            /**
             * Number of milliseconds to delay.
             */
            wait: number;
            /**
             * Specify invoking on the trailing edge of the timeout.
             */
            trailing?: boolean;
            /**
             * Specify invoking on the leading edge of the timeout.
             */
            leading?: boolean;
        };
    }

    interface MouseEventOptions {
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
        x: number;
        y: number;
        pageX: number;
        pageY: number;
        screenX: number;
        screenY: number;
        offsetX: number;
        offsetY: number;
    }

    interface KeyboardEventOptions {
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
        code: string;
        key: string;
        location: number;
        repeat: boolean;
    }

    interface InputEventOptions {
        value: any;
    }

    interface FocusEventOptions { }

    interface UploadedFile {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: Uint8Array;
        size: number;
    }

    type EventOptions = MouseEventOptions | KeyboardEventOptions | InputEventOptions | FocusEventOptions;

    type IPropertiesToAdd<T> = T & {
        trailing: boolean;
        leading: boolean;
    };
    type EventFunction<T> = (options: IPropertiesToAdd<T>, files?: UploadedFile[]) => Promise<void>;
    type ElementEvent<T> = EventFunction<T> | [EventFunction<T>, EventConfig];

    interface DefaultElementEventProps extends DefaultElementProps {
        onclick?: ElementEvent<MouseEventOptions>;
        oncontextmenu?: ElementEvent<MouseEventOptions>;
        ondblclick?: ElementEvent<MouseEventOptions>;
        onmousedown?: ElementEvent<MouseEventOptions>;
        onmouseenter?: ElementEvent<MouseEventOptions>;
        onmouseleave?: ElementEvent<MouseEventOptions>;
        onmousemove?: ElementEvent<MouseEventOptions>;
        onmouseout?: ElementEvent<MouseEventOptions>;
        onmouseover?: ElementEvent<MouseEventOptions>;
        onmouseup?: ElementEvent<MouseEventOptions>;

        onkeydown?: ElementEvent<KeyboardEventOptions>;
        onkeypress?: ElementEvent<KeyboardEventOptions>;
        onkeyup?: ElementEvent<KeyboardEventOptions>;

        oninput?: ElementEvent<InputEventOptions>;
        onchange?: ElementEvent<InputEventOptions>;

        onblur?: ElementEvent<FocusEventOptions>;
        onfocus?: ElementEvent<FocusEventOptions>;
        onfocusin?: ElementEvent<FocusEventOptions>;
        onfocusout?: ElementEvent<FocusEventOptions>;

        [key: string]: any;
    }

    interface DefaultSvgElementEventProps extends DefaultSvgElementProps {
        onclick?: ElementEvent<MouseEventOptions>;
        oncontextmenu?: ElementEvent<MouseEventOptions>;
        ondblclick?: ElementEvent<MouseEventOptions>;
        onmousedown?: ElementEvent<MouseEventOptions>;
        onmouseenter?: ElementEvent<MouseEventOptions>;
        onmouseleave?: ElementEvent<MouseEventOptions>;
        onmousemove?: ElementEvent<MouseEventOptions>;
        onmouseout?: ElementEvent<MouseEventOptions>;
        onmouseover?: ElementEvent<MouseEventOptions>;
        onmouseup?: ElementEvent<MouseEventOptions>;

        onkeydown?: ElementEvent<KeyboardEventOptions>;
        onkeypress?: ElementEvent<KeyboardEventOptions>;
        onkeyup?: ElementEvent<KeyboardEventOptions>;

        oninput?: ElementEvent<InputEventOptions>;
        onchange?: ElementEvent<InputEventOptions>;

        onblur?: ElementEvent<FocusEventOptions>;
        onfocus?: ElementEvent<FocusEventOptions>;
        onfocusin?: ElementEvent<FocusEventOptions>;
        onfocusout?: ElementEvent<FocusEventOptions>;

        [key: string]: any;
    }

    /*** INTRINSIC_ELEMENT_INTERFACES */
	interface DefaultElementProps {
		"accesskey"?: string;
		"autocapitalize"?: string;
		"autofocus"?: string;
		"class"?: string;
		"contenteditable"?: string;
		"dir"?: string;
		"draggable"?: string;
		"enterkeyhint"?: string;
		"hidden"?: string;
		"id"?: string;
		"inputmode"?: string;
		"is"?: string;
		"itemid"?: string;
		"itemprop"?: string;
		"itemref"?: string;
		"itemscope"?: string;
		"itemtype"?: string;
		"lang"?: string;
		"nonce"?: string;
		"slot"?: string;
		"spellcheck"?: string;
		"style"?: CSS;
		"tabindex"?: string;
		"title"?: string;
		"translate"?: string;
	}

	interface AElementProps extends DefaultElementEventProps {
		"charset"?: string;
		"coords"?: string;
		"download"?: string;
		"href"?: string;
		"hreflang"?: string;
		"name"?: string;
		"ping"?: string;
		"referrerpolicy"?: string;
		"rel"?: string;
		"rev"?: string;
		"shape"?: string;
		"target"?: string;
		"type"?: string;
	}

	interface AppletElementProps extends DefaultElementEventProps {
		"align"?: string;
		"alt"?: string;
		"archive"?: string;
		"code"?: string;
		"codebase"?: string;
		"height"?: string;
		"hspace"?: string;
		"name"?: string;
		"object"?: string;
		"vspace"?: string;
		"width"?: string;
	}

	interface AreaElementProps extends DefaultElementEventProps {
		"alt"?: string;
		"coords"?: string;
		"download"?: string;
		"href"?: string;
		"hreflang"?: string;
		"nohref"?: string;
		"ping"?: string;
		"referrerpolicy"?: string;
		"rel"?: string;
		"shape"?: string;
		"target"?: string;
		"type"?: string;
	}

	interface AudioElementProps extends DefaultElementEventProps {
		"autoplay"?: string;
		"controls"?: string;
		"crossorigin"?: string;
		"loop"?: string;
		"muted"?: string;
		"preload"?: string;
		"src"?: string;
	}

	interface BaseElementProps extends DefaultElementEventProps {
		"href"?: string;
		"target"?: string;
	}

	interface BasefontElementProps extends DefaultElementEventProps {
		"color"?: string;
		"face"?: string;
		"size"?: string;
	}

	interface BlockquoteElementProps extends DefaultElementEventProps {
		"cite"?: string;
	}

	interface BodyElementProps extends DefaultElementEventProps {
		"alink"?: string;
		"background"?: string;
		"bgcolor"?: string;
		"link"?: string;
		"text"?: string;
		"vlink"?: string;
	}

	interface BrElementProps extends DefaultElementEventProps {
		"clear"?: string;
	}

	interface ButtonElementProps extends DefaultElementEventProps {
		"disabled"?: string;
		"form"?: string;
		"formaction"?: string;
		"formenctype"?: string;
		"formmethod"?: string;
		"formnovalidate"?: string;
		"formtarget"?: string;
		"name"?: string;
		"type"?: string;
		"value"?: string;
	}

	interface CanvasElementProps extends DefaultElementEventProps {
		"height"?: string;
		"width"?: string;
	}

	interface CaptionElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface ColElementProps extends DefaultElementEventProps {
		"align"?: string;
		"char"?: string;
		"charoff"?: string;
		"span"?: string;
		"valign"?: string;
		"width"?: string;
	}

	interface ColgroupElementProps extends DefaultElementEventProps {
		"align"?: string;
		"char"?: string;
		"charoff"?: string;
		"span"?: string;
		"valign"?: string;
		"width"?: string;
	}

	interface DataElementProps extends DefaultElementEventProps {
		"value"?: string;
	}

	interface DelElementProps extends DefaultElementEventProps {
		"cite"?: string;
		"datetime"?: string;
	}

	interface DetailsElementProps extends DefaultElementEventProps {
		"open"?: string;
	}

	interface DialogElementProps extends DefaultElementEventProps {
		"open"?: string;
	}

	interface DirElementProps extends DefaultElementEventProps {
		"compact"?: string;
	}

	interface DivElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface DlElementProps extends DefaultElementEventProps {
		"compact"?: string;
	}

	interface EmbedElementProps extends DefaultElementEventProps {
		"height"?: string;
		"src"?: string;
		"type"?: string;
		"width"?: string;
	}

	interface FieldsetElementProps extends DefaultElementEventProps {
		"disabled"?: string;
		"form"?: string;
		"name"?: string;
	}

	interface FontElementProps extends DefaultElementEventProps {
		"color"?: string;
		"face"?: string;
		"size"?: string;
	}

	interface FormElementProps extends DefaultElementEventProps {
		"accept"?: string;
		"accept-charset"?: string;
		"action"?: string;
		"autocomplete"?: string;
		"enctype"?: string;
		"method"?: string;
		"name"?: string;
		"novalidate"?: string;
		"target"?: string;
	}

	interface FrameElementProps extends DefaultElementEventProps {
		"frameborder"?: string;
		"longdesc"?: string;
		"marginheight"?: string;
		"marginwidth"?: string;
		"name"?: string;
		"noresize"?: string;
		"scrolling"?: string;
		"src"?: string;
	}

	interface FramesetElementProps extends DefaultElementEventProps {
		"cols"?: string;
		"rows"?: string;
	}

	interface H1ElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface H2ElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface H3ElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface H4ElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface H5ElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface H6ElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface HeadElementProps extends DefaultElementEventProps {
		"profile"?: string;
	}

	interface HrElementProps extends DefaultElementEventProps {
		"align"?: string;
		"noshade"?: string;
		"size"?: string;
		"width"?: string;
	}

	interface HtmlElementProps extends DefaultElementEventProps {
		"manifest"?: string;
		"version"?: string;
	}

	interface IframeElementProps extends DefaultElementEventProps {
		"align"?: string;
		"allow"?: string;
		"allowfullscreen"?: string;
		"allowpaymentrequest"?: string;
		"allowusermedia"?: string;
		"frameborder"?: string;
		"height"?: string;
		"loading"?: string;
		"longdesc"?: string;
		"marginheight"?: string;
		"marginwidth"?: string;
		"name"?: string;
		"referrerpolicy"?: string;
		"sandbox"?: string;
		"scrolling"?: string;
		"src"?: string;
		"srcdoc"?: string;
		"width"?: string;
	}

	interface ImgElementProps extends DefaultElementEventProps {
		"align"?: string;
		"alt"?: string;
		"border"?: string;
		"crossorigin"?: string;
		"decoding"?: string;
		"height"?: string;
		"hspace"?: string;
		"ismap"?: string;
		"loading"?: string;
		"longdesc"?: string;
		"name"?: string;
		"referrerpolicy"?: string;
		"sizes"?: string;
		"src"?: string;
		"srcset"?: string;
		"usemap"?: string;
		"vspace"?: string;
		"width"?: string;
	}

	interface InputElementProps extends DefaultElementEventProps {
		"accept"?: string;
		"align"?: string;
		"alt"?: string;
		"autocomplete"?: string;
		"checked"?: string;
		"dirname"?: string;
		"disabled"?: string;
		"form"?: string;
		"formaction"?: string;
		"formenctype"?: string;
		"formmethod"?: string;
		"formnovalidate"?: string;
		"formtarget"?: string;
		"height"?: string;
		"ismap"?: string;
		"list"?: string;
		"max"?: string;
		"maxlength"?: string;
		"min"?: string;
		"minlength"?: string;
		"multiple"?: string;
		"name"?: string;
		"pattern"?: string;
		"placeholder"?: string;
		"readonly"?: string;
		"required"?: string;
		"size"?: string;
		"src"?: string;
		"step"?: string;
		"type"?: string;
		"usemap"?: string;
		"value"?: string;
		"width"?: string;
	}

	interface InsElementProps extends DefaultElementEventProps {
		"cite"?: string;
		"datetime"?: string;
	}

	interface IsindexElementProps extends DefaultElementEventProps {
		"prompt"?: string;
	}

	interface LabelElementProps extends DefaultElementEventProps {
		"for"?: string;
		"form"?: string;
	}

	interface LegendElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface LiElementProps extends DefaultElementEventProps {
		"type"?: string;
		"value"?: string;
	}

	interface LinkElementProps extends DefaultElementEventProps {
		"as"?: string;
		"charset"?: string;
		"color"?: string;
		"crossorigin"?: string;
		"disabled"?: string;
		"href"?: string;
		"hreflang"?: string;
		"imagesizes"?: string;
		"imagesrcset"?: string;
		"integrity"?: string;
		"media"?: string;
		"referrerpolicy"?: string;
		"rel"?: string;
		"rev"?: string;
		"sizes"?: string;
		"target"?: string;
		"type"?: string;
	}

	interface MapElementProps extends DefaultElementEventProps {
		"name"?: string;
	}

	interface MenuElementProps extends DefaultElementEventProps {
		"compact"?: string;
	}

	interface MetaElementProps extends DefaultElementEventProps {
		"charset"?: string;
		"content"?: string;
		"http-equiv"?: string;
		"name"?: string;
		"scheme"?: string;
	}

	interface MeterElementProps extends DefaultElementEventProps {
		"high"?: string;
		"low"?: string;
		"max"?: string;
		"min"?: string;
		"optimum"?: string;
		"value"?: string;
	}

	interface ObjectElementProps extends DefaultElementEventProps {
		"align"?: string;
		"archive"?: string;
		"border"?: string;
		"classid"?: string;
		"codebase"?: string;
		"codetype"?: string;
		"data"?: string;
		"declare"?: string;
		"form"?: string;
		"height"?: string;
		"hspace"?: string;
		"name"?: string;
		"standby"?: string;
		"type"?: string;
		"typemustmatch"?: string;
		"usemap"?: string;
		"vspace"?: string;
		"width"?: string;
	}

	interface OlElementProps extends DefaultElementEventProps {
		"compact"?: string;
		"reversed"?: string;
		"start"?: string;
		"type"?: string;
	}

	interface OptgroupElementProps extends DefaultElementEventProps {
		"disabled"?: string;
		"label"?: string;
	}

	interface OptionElementProps extends DefaultElementEventProps {
		"disabled"?: string;
		"label"?: string;
		"selected"?: string;
		"value"?: string;
	}

	interface OutputElementProps extends DefaultElementEventProps {
		"for"?: string;
		"form"?: string;
		"name"?: string;
	}

	interface PElementProps extends DefaultElementEventProps {
		"align"?: string;
	}

	interface ParamElementProps extends DefaultElementEventProps {
		"name"?: string;
		"type"?: string;
		"value"?: string;
		"valuetype"?: string;
	}

	interface PreElementProps extends DefaultElementEventProps {
		"width"?: string;
	}

	interface ProgressElementProps extends DefaultElementEventProps {
		"max"?: string;
		"value"?: string;
	}

	interface QElementProps extends DefaultElementEventProps {
		"cite"?: string;
	}

	interface ScriptElementProps extends DefaultElementEventProps {
		"async"?: string;
		"charset"?: string;
		"crossorigin"?: string;
		"defer"?: string;
		"integrity"?: string;
		"language"?: string;
		"nomodule"?: string;
		"referrerpolicy"?: string;
		"src"?: string;
		"type"?: string;
	}

	interface SelectElementProps extends DefaultElementEventProps {
		"autocomplete"?: string;
		"disabled"?: string;
		"form"?: string;
		"multiple"?: string;
		"name"?: string;
		"required"?: string;
		"size"?: string;
	}

	interface SlotElementProps extends DefaultElementEventProps {
		"name"?: string;
	}

	interface SourceElementProps extends DefaultElementEventProps {
		"height"?: string;
		"media"?: string;
		"sizes"?: string;
		"src"?: string;
		"srcset"?: string;
		"type"?: string;
		"width"?: string;
	}

	interface StyleElementProps extends DefaultElementEventProps {
		"media"?: string;
		"type"?: string;
	}

	interface TableElementProps extends DefaultElementEventProps {
		"align"?: string;
		"bgcolor"?: string;
		"border"?: string;
		"cellpadding"?: string;
		"cellspacing"?: string;
		"frame"?: string;
		"rules"?: string;
		"summary"?: string;
		"width"?: string;
	}

	interface TbodyElementProps extends DefaultElementEventProps {
		"align"?: string;
		"char"?: string;
		"charoff"?: string;
		"valign"?: string;
	}

	interface TdElementProps extends DefaultElementEventProps {
		"abbr"?: string;
		"align"?: string;
		"axis"?: string;
		"bgcolor"?: string;
		"char"?: string;
		"charoff"?: string;
		"colspan"?: string;
		"headers"?: string;
		"height"?: string;
		"nowrap"?: string;
		"rowspan"?: string;
		"scope"?: string;
		"valign"?: string;
		"width"?: string;
	}

	interface TextareaElementProps extends DefaultElementEventProps {
		"autocomplete"?: string;
		"cols"?: string;
		"dirname"?: string;
		"disabled"?: string;
		"form"?: string;
		"maxlength"?: string;
		"minlength"?: string;
		"name"?: string;
		"placeholder"?: string;
		"readonly"?: string;
		"required"?: string;
		"rows"?: string;
		"wrap"?: string;
	}

	interface TfootElementProps extends DefaultElementEventProps {
		"align"?: string;
		"char"?: string;
		"charoff"?: string;
		"valign"?: string;
	}

	interface ThElementProps extends DefaultElementEventProps {
		"abbr"?: string;
		"align"?: string;
		"axis"?: string;
		"bgcolor"?: string;
		"char"?: string;
		"charoff"?: string;
		"colspan"?: string;
		"headers"?: string;
		"height"?: string;
		"nowrap"?: string;
		"rowspan"?: string;
		"scope"?: string;
		"valign"?: string;
		"width"?: string;
	}

	interface TheadElementProps extends DefaultElementEventProps {
		"align"?: string;
		"char"?: string;
		"charoff"?: string;
		"valign"?: string;
	}

	interface TimeElementProps extends DefaultElementEventProps {
		"datetime"?: string;
	}

	interface TrElementProps extends DefaultElementEventProps {
		"align"?: string;
		"bgcolor"?: string;
		"char"?: string;
		"charoff"?: string;
		"valign"?: string;
	}

	interface TrackElementProps extends DefaultElementEventProps {
		"default"?: string;
		"kind"?: string;
		"label"?: string;
		"src"?: string;
		"srclang"?: string;
	}

	interface UlElementProps extends DefaultElementEventProps {
		"compact"?: string;
		"type"?: string;
	}

	interface VideoElementProps extends DefaultElementEventProps {
		"autoplay"?: string;
		"controls"?: string;
		"crossorigin"?: string;
		"height"?: string;
		"loop"?: string;
		"muted"?: string;
		"playsinline"?: string;
		"poster"?: string;
		"preload"?: string;
		"src"?: string;
		"width"?: string;
	}

	interface DefaultSvgElementProps {
		"about"?: string;
		"class"?: string;
		"content"?: string;
		"datatype"?: string;
		"id"?: string;
		"lang"?: string;
		"property"?: string;
		"rel"?: string;
		"resource"?: string;
		"rev"?: string;
		"style"?: CSS;
		"tabindex"?: string;
		"typeof"?: string;
	}

	interface ASvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"download"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"href"?: string;
		"hreflang"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"ping"?: string;
		"pointer-events"?: string;
		"referrerpolicy"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"target"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"type"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface AltglyphSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dx"?: string;
		"dy"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"format"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"glyphRef"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"rotate"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface AnimateSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: string;
		"additive"?: string;
		"alignment-baseline"?: string;
		"attributeName"?: string;
		"attributeType"?: string;
		"baseline-shift"?: string;
		"begin"?: string;
		"by"?: string;
		"calcMode"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dur"?: string;
		"enable-background"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"from"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"keySplines"?: string;
		"keyTimes"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"max"?: string;
		"min"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"to"?: string;
		"unicode-bidi"?: string;
		"values"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface AnimatecolorSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: string;
		"additive"?: string;
		"alignment-baseline"?: string;
		"attributeName"?: string;
		"attributeType"?: string;
		"baseline-shift"?: string;
		"begin"?: string;
		"by"?: string;
		"calcMode"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dur"?: string;
		"enable-background"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"from"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"keySplines"?: string;
		"keyTimes"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"max"?: string;
		"min"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"to"?: string;
		"unicode-bidi"?: string;
		"values"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface AnimatemotionSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: string;
		"additive"?: string;
		"begin"?: string;
		"by"?: string;
		"calcMode"?: string;
		"dur"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"from"?: string;
		"href"?: string;
		"keyPoints"?: string;
		"keySplines"?: string;
		"keyTimes"?: string;
		"max"?: string;
		"min"?: string;
		"origin"?: string;
		"path"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"rotate"?: string;
		"systemLanguage"?: string;
		"to"?: string;
		"values"?: string;
	}

	interface AnimatetransformSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: string;
		"additive"?: string;
		"attributeName"?: string;
		"attributeType"?: string;
		"begin"?: string;
		"by"?: string;
		"calcMode"?: string;
		"dur"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"from"?: string;
		"href"?: string;
		"keySplines"?: string;
		"keyTimes"?: string;
		"max"?: string;
		"min"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"systemLanguage"?: string;
		"to"?: string;
		"type"?: string;
		"values"?: string;
	}

	interface AnimationSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: string;
		"dur"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"height"?: string;
		"initialVisibility"?: string;
		"max"?: string;
		"min"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"preserveAspectRatio"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"syncBehavior"?: string;
		"syncMaster"?: string;
		"syncTolerance"?: string;
		"systemLanguage"?: string;
		"transform"?: string;
		"width"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface AudioSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: string;
		"dur"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"max"?: string;
		"min"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"syncBehavior"?: string;
		"syncMaster"?: string;
		"syncTolerance"?: string;
		"systemLanguage"?: string;
		"type"?: string;
	}

	interface CanvasSvgElementProps extends DefaultSvgElementEventProps {
		"preserveAspectRatio"?: string;
		"requiredExtensions"?: string;
		"systemLanguage"?: string;
	}

	interface CircleSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"cx"?: string;
		"cy"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pathLength"?: string;
		"pointer-events"?: string;
		"r"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface ClippathSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"clipPathUnits"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface ColorprofileSvgElementProps extends DefaultSvgElementEventProps {
		"local"?: string;
		"name"?: string;
		"rendering-intent"?: string;
	}

	interface CursorSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"systemLanguage"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface DefsSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface DescSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"systemLanguage"?: string;
	}

	interface DiscardSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: string;
		"href"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"systemLanguage"?: string;
	}

	interface EllipseSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"cx"?: string;
		"cy"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pathLength"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"rx"?: string;
		"ry"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface FeblendSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"in2"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"mode"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FecolormatrixSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"type"?: string;
		"unicode-bidi"?: string;
		"values"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FecomponenttransferSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FecompositeSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"in2"?: string;
		"k1"?: string;
		"k2"?: string;
		"k3"?: string;
		"k4"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"operator"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FeconvolvematrixSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"bias"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"divisor"?: string;
		"dominant-baseline"?: string;
		"edgeMode"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kernelMatrix"?: string;
		"kernelUnitLength"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"order"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"preserveAlpha"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"targetX"?: string;
		"targetY"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FediffuselightingSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"diffuseConstant"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kernelUnitLength"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"surfaceScale"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FedisplacementmapSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"in2"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"scale"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"xChannelSelector"?: string;
		"y"?: string;
		"yChannelSelector"?: string;
	}

	interface FedistantlightSvgElementProps extends DefaultSvgElementEventProps {
		"azimuth"?: string;
		"elevation"?: string;
	}

	interface FedropshadowSvgElementProps extends DefaultSvgElementEventProps {
		"dx"?: string;
		"dy"?: string;
		"height"?: string;
		"in"?: string;
		"result"?: string;
		"stdDeviation"?: string;
		"width"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FefloodSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FefuncaSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: string;
		"exponent"?: string;
		"intercept"?: string;
		"offset"?: string;
		"slope"?: string;
		"tableValues"?: string;
		"type"?: string;
	}

	interface FefuncbSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: string;
		"exponent"?: string;
		"intercept"?: string;
		"offset"?: string;
		"slope"?: string;
		"tableValues"?: string;
		"type"?: string;
	}

	interface FefuncgSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: string;
		"exponent"?: string;
		"intercept"?: string;
		"offset"?: string;
		"slope"?: string;
		"tableValues"?: string;
		"type"?: string;
	}

	interface FefuncrSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: string;
		"exponent"?: string;
		"intercept"?: string;
		"offset"?: string;
		"slope"?: string;
		"tableValues"?: string;
		"type"?: string;
	}

	interface FegaussianblurSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"edgeMode"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stdDeviation"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FeimageSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"crossorigin"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"preserveAspectRatio"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FemergeSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FemergenodeSvgElementProps extends DefaultSvgElementEventProps {
		"in"?: string;
	}

	interface FemorphologySvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"operator"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"radius"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FeoffsetSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dx"?: string;
		"dy"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FepointlightSvgElementProps extends DefaultSvgElementEventProps {
		"x"?: string;
		"y"?: string;
		"z"?: string;
	}

	interface FespecularlightingSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kernelUnitLength"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"specularConstant"?: string;
		"specularExponent"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"surfaceScale"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FespotlightSvgElementProps extends DefaultSvgElementEventProps {
		"limitingConeAngle"?: string;
		"pointsAtX"?: string;
		"pointsAtY"?: string;
		"pointsAtZ"?: string;
		"specularExponent"?: string;
		"x"?: string;
		"y"?: string;
		"z"?: string;
	}

	interface FetileSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"in"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FeturbulenceSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseFrequency"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"numOctaves"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"result"?: string;
		"seed"?: string;
		"shape-rendering"?: string;
		"stitchTiles"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"type"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FilterSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"filterRes"?: string;
		"filterUnits"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"primitiveUnits"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface FontSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"horiz-adv-x"?: string;
		"horiz-origin-x"?: string;
		"horiz-origin-y"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"vert-adv-y"?: string;
		"vert-origin-x"?: string;
		"vert-origin-y"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface FontfaceSvgElementProps extends DefaultSvgElementEventProps {
		"accent-height"?: string;
		"alphabetic"?: string;
		"ascent"?: string;
		"bbox"?: string;
		"cap-height"?: string;
		"descent"?: string;
		"externalResourcesRequired"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"hanging"?: string;
		"ideographic"?: string;
		"mathematical"?: string;
		"overline-position"?: string;
		"overline-thickness"?: string;
		"panose-1"?: string;
		"slope"?: string;
		"stemh"?: string;
		"stemv"?: string;
		"strikethrough-position"?: string;
		"strikethrough-thickness"?: string;
		"underline-position"?: string;
		"underline-thickness"?: string;
		"unicode-range"?: string;
		"units-per-em"?: string;
		"v-alphabetic"?: string;
		"v-hanging"?: string;
		"v-ideographic"?: string;
		"v-mathematical"?: string;
		"widths"?: string;
		"x-height"?: string;
	}

	interface FontfaceformatSvgElementProps extends DefaultSvgElementEventProps {
		"string"?: string;
	}

	interface FontfacenameSvgElementProps extends DefaultSvgElementEventProps {
		"name"?: string;
	}

	interface FontfaceuriSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: string;
	}

	interface ForeignobjectSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface GSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface GlyphSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"arabic-form"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"d"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-name"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"horiz-adv-x"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"orientation"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode"?: string;
		"unicode-bidi"?: string;
		"vert-adv-y"?: string;
		"vert-origin-x"?: string;
		"vert-origin-y"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface GlyphrefSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dx"?: string;
		"dy"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"format"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"glyphRef"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface HandlerSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: string;
		"type"?: string;
	}

	interface HkernSvgElementProps extends DefaultSvgElementEventProps {
		"g1"?: string;
		"g2"?: string;
		"k"?: string;
		"u1"?: string;
		"u2"?: string;
	}

	interface IframeSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: string;
		"systemLanguage"?: string;
	}

	interface ImageSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"crossorigin"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"preserveAspectRatio"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"type"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface LineSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pathLength"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x1"?: string;
		"x2"?: string;
		"y1"?: string;
		"y2"?: string;
	}

	interface LineargradientSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"gradientTransform"?: string;
		"gradientUnits"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"shape-rendering"?: string;
		"spreadMethod"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x1"?: string;
		"x2"?: string;
		"y1"?: string;
		"y2"?: string;
	}

	interface ListenerSvgElementProps extends DefaultSvgElementEventProps {
		"defaultAction"?: string;
		"event"?: string;
		"handler"?: string;
		"observer"?: string;
		"phase"?: string;
		"propagate"?: string;
		"target"?: string;
	}

	interface MarkerSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"markerHeight"?: string;
		"markerUnits"?: string;
		"markerWidth"?: string;
		"mask"?: string;
		"opacity"?: string;
		"orient"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"preserveAspectRatio"?: string;
		"refX"?: string;
		"refY"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"viewBox"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface MaskSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"maskContentUnits"?: string;
		"maskUnits"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface MetadataSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"systemLanguage"?: string;
	}

	interface MissingglyphSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"d"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"horiz-adv-x"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"vert-adv-y"?: string;
		"vert-origin-x"?: string;
		"vert-origin-y"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface MpathSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: string;
		"href"?: string;
	}

	interface PathSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"d"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pathLength"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface PatternSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"patternContentUnits"?: string;
		"patternTransform"?: string;
		"patternUnits"?: string;
		"pointer-events"?: string;
		"preserveAspectRatio"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"viewBox"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface PolygonSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pathLength"?: string;
		"pointer-events"?: string;
		"points"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface PolylineSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pathLength"?: string;
		"pointer-events"?: string;
		"points"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface PrefetchSvgElementProps extends DefaultSvgElementEventProps {
		"bandwidth"?: string;
		"mediaCharacterEncoding"?: string;
		"mediaContentEncodings"?: string;
		"mediaSize"?: string;
		"mediaTime"?: string;
	}

	interface RadialgradientSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"cx"?: string;
		"cy"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"fr"?: string;
		"fx"?: string;
		"fy"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"gradientTransform"?: string;
		"gradientUnits"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"r"?: string;
		"shape-rendering"?: string;
		"spreadMethod"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface RectSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pathLength"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"rx"?: string;
		"ry"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface ScriptSvgElementProps extends DefaultSvgElementEventProps {
		"crossorigin"?: string;
		"externalResourcesRequired"?: string;
		"href"?: string;
		"type"?: string;
	}

	interface SetSvgElementProps extends DefaultSvgElementEventProps {
		"attributeName"?: string;
		"attributeType"?: string;
		"begin"?: string;
		"dur"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"href"?: string;
		"max"?: string;
		"min"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"systemLanguage"?: string;
		"to"?: string;
	}

	interface StopSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"offset"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface StyleSvgElementProps extends DefaultSvgElementEventProps {
		"media"?: string;
		"title"?: string;
		"type"?: string;
	}

	interface SvgSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseProfile"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"contentScriptType"?: string;
		"contentStyleType"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"playbackOrder"?: string;
		"playbackorder"?: string;
		"pointer-events"?: string;
		"preserveAspectRatio"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"shape-rendering"?: string;
		"snapshotTime"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"syncBehaviorDefault"?: string;
		"syncToleranceDefault"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"timelineBegin"?: string;
		"timelinebegin"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"version"?: string;
		"viewBox"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
		"zoomAndPan"?: string;
	}

	interface SwitchSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface SymbolSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"preserveAspectRatio"?: string;
		"refX"?: string;
		"refY"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"unicode-bidi"?: string;
		"viewBox"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface TbreakSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"systemLanguage"?: string;
	}

	interface TextSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dx"?: string;
		"dy"?: string;
		"editable"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"lengthAdjust"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"rotate"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"textLength"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface TextareaSvgElementProps extends DefaultSvgElementEventProps {
		"editable"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"height"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"systemLanguage"?: string;
		"transform"?: string;
		"width"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface TextpathSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"lengthAdjust"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"method"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"path"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"shape-rendering"?: string;
		"side"?: string;
		"spacing"?: string;
		"startOffset"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"textLength"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
	}

	interface TitleSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"systemLanguage"?: string;
	}

	interface TrefSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dx"?: string;
		"dy"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"lengthAdjust"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"rotate"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"textLength"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface TspanSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"dx"?: string;
		"dy"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"lengthAdjust"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"rotate"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"textLength"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface UnknownSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: string;
		"systemLanguage"?: string;
	}

	interface UseSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: string;
		"baseline-shift"?: string;
		"clip"?: string;
		"clip-path"?: string;
		"clip-rule"?: string;
		"color"?: string;
		"color-interpolation"?: string;
		"color-interpolation-filters"?: string;
		"color-profile"?: string;
		"color-rendering"?: string;
		"cursor"?: string;
		"direction"?: string;
		"display"?: string;
		"dominant-baseline"?: string;
		"enable-background"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"fill-opacity"?: string;
		"fill-rule"?: string;
		"filter"?: string;
		"flood-color"?: string;
		"flood-opacity"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"font-family"?: string;
		"font-size"?: string;
		"font-size-adjust"?: string;
		"font-stretch"?: string;
		"font-style"?: string;
		"font-variant"?: string;
		"font-weight"?: string;
		"glyph-orientation-horizontal"?: string;
		"glyph-orientation-vertical"?: string;
		"height"?: string;
		"href"?: string;
		"image-rendering"?: string;
		"kerning"?: string;
		"letter-spacing"?: string;
		"lighting-color"?: string;
		"marker-end"?: string;
		"marker-mid"?: string;
		"marker-start"?: string;
		"mask"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"opacity"?: string;
		"overflow"?: string;
		"pointer-events"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"shape-rendering"?: string;
		"stop-color"?: string;
		"stop-opacity"?: string;
		"stroke"?: string;
		"stroke-dasharray"?: string;
		"stroke-dashoffset"?: string;
		"stroke-linecap"?: string;
		"stroke-linejoin"?: string;
		"stroke-miterlimit"?: string;
		"stroke-opacity"?: string;
		"stroke-width"?: string;
		"systemLanguage"?: string;
		"text-anchor"?: string;
		"text-decoration"?: string;
		"text-rendering"?: string;
		"transform"?: string;
		"unicode-bidi"?: string;
		"visibility"?: string;
		"width"?: string;
		"word-spacing"?: string;
		"writing-mode"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface VideoSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: string;
		"dur"?: string;
		"end"?: string;
		"externalResourcesRequired"?: string;
		"fill"?: string;
		"focusHighlight"?: string;
		"focusable"?: string;
		"height"?: string;
		"initialVisibility"?: string;
		"max"?: string;
		"min"?: string;
		"nav-down"?: string;
		"nav-down-left"?: string;
		"nav-down-right"?: string;
		"nav-left"?: string;
		"nav-next"?: string;
		"nav-prev"?: string;
		"nav-right"?: string;
		"nav-up"?: string;
		"nav-up-left"?: string;
		"nav-up-right"?: string;
		"overlay"?: string;
		"preserveAspectRatio"?: string;
		"repeatCount"?: string;
		"repeatDur"?: string;
		"requiredExtensions"?: string;
		"requiredFeatures"?: string;
		"requiredFonts"?: string;
		"requiredFormats"?: string;
		"restart"?: string;
		"syncBehavior"?: string;
		"syncMaster"?: string;
		"syncTolerance"?: string;
		"systemLanguage"?: string;
		"transform"?: string;
		"transformBehavior"?: string;
		"type"?: string;
		"width"?: string;
		"x"?: string;
		"y"?: string;
	}

	interface ViewSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: string;
		"preserveAspectRatio"?: string;
		"viewBox"?: string;
		"viewTarget"?: string;
		"zoomAndPan"?: string;
	}

	interface VkernSvgElementProps extends DefaultSvgElementEventProps {
		"g1"?: string;
		"g2"?: string;
		"k"?: string;
		"u1"?: string;
		"u2"?: string;
	}

    namespace JSX {
        interface IntrinsicElements {
            /*** INTRINSIC_ELEMENTS */
		"a"?: AElementProps;
		"applet"?: AppletElementProps;
		"area"?: AreaElementProps;
		"audio"?: AudioElementProps;
		"base"?: BaseElementProps;
		"basefont"?: BasefontElementProps;
		"blockquote"?: BlockquoteElementProps;
		"body"?: BodyElementProps;
		"br"?: BrElementProps;
		"button"?: ButtonElementProps;
		"canvas"?: CanvasElementProps;
		"caption"?: CaptionElementProps;
		"col"?: ColElementProps;
		"colgroup"?: ColgroupElementProps;
		"data"?: DataElementProps;
		"del"?: DelElementProps;
		"details"?: DetailsElementProps;
		"dialog"?: DialogElementProps;
		"dir"?: DirElementProps;
		"div"?: DivElementProps;
		"dl"?: DlElementProps;
		"embed"?: EmbedElementProps;
		"fieldset"?: FieldsetElementProps;
		"font"?: FontElementProps;
		"form"?: FormElementProps;
		"frame"?: FrameElementProps;
		"frameset"?: FramesetElementProps;
		"h1"?: H1ElementProps;
		"h2"?: H2ElementProps;
		"h3"?: H3ElementProps;
		"h4"?: H4ElementProps;
		"h5"?: H5ElementProps;
		"h6"?: H6ElementProps;
		"head"?: HeadElementProps;
		"hr"?: HrElementProps;
		"html"?: HtmlElementProps;
		"iframe"?: IframeElementProps;
		"img"?: ImgElementProps;
		"input"?: InputElementProps;
		"ins"?: InsElementProps;
		"isindex"?: IsindexElementProps;
		"label"?: LabelElementProps;
		"legend"?: LegendElementProps;
		"li"?: LiElementProps;
		"link"?: LinkElementProps;
		"map"?: MapElementProps;
		"menu"?: MenuElementProps;
		"meta"?: MetaElementProps;
		"meter"?: MeterElementProps;
		"object"?: ObjectElementProps;
		"ol"?: OlElementProps;
		"optgroup"?: OptgroupElementProps;
		"option"?: OptionElementProps;
		"output"?: OutputElementProps;
		"p"?: PElementProps;
		"param"?: ParamElementProps;
		"pre"?: PreElementProps;
		"progress"?: ProgressElementProps;
		"q"?: QElementProps;
		"script"?: ScriptElementProps;
		"select"?: SelectElementProps;
		"slot"?: SlotElementProps;
		"source"?: SourceElementProps;
		"style"?: StyleElementProps;
		"table"?: TableElementProps;
		"tbody"?: TbodyElementProps;
		"td"?: TdElementProps;
		"textarea"?: TextareaElementProps;
		"tfoot"?: TfootElementProps;
		"th"?: ThElementProps;
		"thead"?: TheadElementProps;
		"time"?: TimeElementProps;
		"tr"?: TrElementProps;
		"track"?: TrackElementProps;
		"ul"?: UlElementProps;
		"video"?: VideoElementProps;
		"altGlyph"?: AltglyphSvgElementProps;
		"animate"?: AnimateSvgElementProps;
		"animateColor"?: AnimatecolorSvgElementProps;
		"animateMotion"?: AnimatemotionSvgElementProps;
		"animateTransform"?: AnimatetransformSvgElementProps;
		"animation"?: AnimationSvgElementProps;
		"circle"?: CircleSvgElementProps;
		"clipPath"?: ClippathSvgElementProps;
		"color-profile"?: ColorprofileSvgElementProps;
		"cursor"?: CursorSvgElementProps;
		"defs"?: DefsSvgElementProps;
		"desc"?: DescSvgElementProps;
		"discard"?: DiscardSvgElementProps;
		"ellipse"?: EllipseSvgElementProps;
		"feBlend"?: FeblendSvgElementProps;
		"feColorMatrix"?: FecolormatrixSvgElementProps;
		"feComponentTransfer"?: FecomponenttransferSvgElementProps;
		"feComposite"?: FecompositeSvgElementProps;
		"feConvolveMatrix"?: FeconvolvematrixSvgElementProps;
		"feDiffuseLighting"?: FediffuselightingSvgElementProps;
		"feDisplacementMap"?: FedisplacementmapSvgElementProps;
		"feDistantLight"?: FedistantlightSvgElementProps;
		"feDropShadow"?: FedropshadowSvgElementProps;
		"feFlood"?: FefloodSvgElementProps;
		"feFuncA"?: FefuncaSvgElementProps;
		"feFuncB"?: FefuncbSvgElementProps;
		"feFuncG"?: FefuncgSvgElementProps;
		"feFuncR"?: FefuncrSvgElementProps;
		"feGaussianBlur"?: FegaussianblurSvgElementProps;
		"feImage"?: FeimageSvgElementProps;
		"feMerge"?: FemergeSvgElementProps;
		"feMergeNode"?: FemergenodeSvgElementProps;
		"feMorphology"?: FemorphologySvgElementProps;
		"feOffset"?: FeoffsetSvgElementProps;
		"fePointLight"?: FepointlightSvgElementProps;
		"feSpecularLighting"?: FespecularlightingSvgElementProps;
		"feSpotLight"?: FespotlightSvgElementProps;
		"feTile"?: FetileSvgElementProps;
		"feTurbulence"?: FeturbulenceSvgElementProps;
		"filter"?: FilterSvgElementProps;
		"font-face"?: FontfaceSvgElementProps;
		"font-face-format"?: FontfaceformatSvgElementProps;
		"font-face-name"?: FontfacenameSvgElementProps;
		"font-face-uri"?: FontfaceuriSvgElementProps;
		"foreignObject"?: ForeignobjectSvgElementProps;
		"g"?: GSvgElementProps;
		"glyph"?: GlyphSvgElementProps;
		"glyphRef"?: GlyphrefSvgElementProps;
		"handler"?: HandlerSvgElementProps;
		"hkern"?: HkernSvgElementProps;
		"image"?: ImageSvgElementProps;
		"line"?: LineSvgElementProps;
		"linearGradient"?: LineargradientSvgElementProps;
		"listener"?: ListenerSvgElementProps;
		"marker"?: MarkerSvgElementProps;
		"mask"?: MaskSvgElementProps;
		"metadata"?: MetadataSvgElementProps;
		"missing-glyph"?: MissingglyphSvgElementProps;
		"mpath"?: MpathSvgElementProps;
		"path"?: PathSvgElementProps;
		"pattern"?: PatternSvgElementProps;
		"polygon"?: PolygonSvgElementProps;
		"polyline"?: PolylineSvgElementProps;
		"prefetch"?: PrefetchSvgElementProps;
		"radialGradient"?: RadialgradientSvgElementProps;
		"rect"?: RectSvgElementProps;
		"set"?: SetSvgElementProps;
		"stop"?: StopSvgElementProps;
		"svg"?: SvgSvgElementProps;
		"switch"?: SwitchSvgElementProps;
		"symbol"?: SymbolSvgElementProps;
		"tbreak"?: TbreakSvgElementProps;
		"text"?: TextSvgElementProps;
		"textArea"?: TextareaSvgElementProps;
		"textPath"?: TextpathSvgElementProps;
		"title"?: TitleSvgElementProps;
		"tref"?: TrefSvgElementProps;
		"tspan"?: TspanSvgElementProps;
		"unknown"?: UnknownSvgElementProps;
		"use"?: UseSvgElementProps;
		"view"?: ViewSvgElementProps;
		"vkern"?: VkernSvgElementProps;

            [key: string]: any;
        }
        interface Element { }
    }

    interface CSS extends _CSS.StandardProperties<number | string>, _CSS.SvgProperties<number | string> { }

    interface DraymanComponent<Props = void, EventHubExtend = void, BrowserExtend = void, DataExtend = void> {
        (data: {
            props: Props;
            forceUpdate: () => Promise<void>;
            EventHub: {
                on(eventName: string, event: ((payload: any) => any), groupId?: string): any;
                emit(eventName: string, data: any, groupId?: string): any;
            } & EventHubExtend;
            Browser: {
                [command: string]: (options?: any) => Promise<any>
            } & BrowserExtend;
        } & DataExtend): any;
    }
}

export { };
