import * as _CSS from 'csstype';

declare global {
    interface EventGuard {
        mask?: EventOptions;
        preventDefault?: boolean;
    }

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
        eventGuards?: EventGuard[];
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
    type EventFunction<T> = (options: IPropertiesToAdd<T>, files?: UploadedFile[], signal?: AbortSignal) => Promise<void>;
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
		"accesskey"?: any;
		"autocapitalize"?: any;
		"autofocus"?: any;
		"class"?: any;
		"contenteditable"?: any;
		"dir"?: any;
		"draggable"?: any;
		"enterkeyhint"?: any;
		"hidden"?: any;
		"id"?: any;
		"inputmode"?: any;
		"is"?: any;
		"itemid"?: any;
		"itemprop"?: any;
		"itemref"?: any;
		"itemscope"?: any;
		"itemtype"?: any;
		"lang"?: any;
		"nonce"?: any;
		"slot"?: any;
		"spellcheck"?: any;
		"style"?: CSS;
		"tabindex"?: any;
		"title"?: any;
		"translate"?: any;
	}

	interface AElementProps extends DefaultElementEventProps {
		"charset"?: any;
		"coords"?: any;
		"download"?: any;
		"href"?: any;
		"hreflang"?: any;
		"name"?: any;
		"ping"?: any;
		"referrerpolicy"?: any;
		"rel"?: any;
		"rev"?: any;
		"shape"?: any;
		"target"?: any;
		"type"?: any;
	}

	interface AppletElementProps extends DefaultElementEventProps {
		"align"?: any;
		"alt"?: any;
		"archive"?: any;
		"code"?: any;
		"codebase"?: any;
		"height"?: any;
		"hspace"?: any;
		"name"?: any;
		"object"?: any;
		"vspace"?: any;
		"width"?: any;
	}

	interface AreaElementProps extends DefaultElementEventProps {
		"alt"?: any;
		"coords"?: any;
		"download"?: any;
		"href"?: any;
		"hreflang"?: any;
		"nohref"?: any;
		"ping"?: any;
		"referrerpolicy"?: any;
		"rel"?: any;
		"shape"?: any;
		"target"?: any;
		"type"?: any;
	}

	interface AudioElementProps extends DefaultElementEventProps {
		"autoplay"?: any;
		"controls"?: any;
		"crossorigin"?: any;
		"loop"?: any;
		"muted"?: any;
		"preload"?: any;
		"src"?: any;
	}

	interface BaseElementProps extends DefaultElementEventProps {
		"href"?: any;
		"target"?: any;
	}

	interface BasefontElementProps extends DefaultElementEventProps {
		"color"?: any;
		"face"?: any;
		"size"?: any;
	}

	interface BlockquoteElementProps extends DefaultElementEventProps {
		"cite"?: any;
	}

	interface BodyElementProps extends DefaultElementEventProps {
		"alink"?: any;
		"background"?: any;
		"bgcolor"?: any;
		"link"?: any;
		"text"?: any;
		"vlink"?: any;
	}

	interface BrElementProps extends DefaultElementEventProps {
		"clear"?: any;
	}

	interface ButtonElementProps extends DefaultElementEventProps {
		"disabled"?: any;
		"form"?: any;
		"formaction"?: any;
		"formenctype"?: any;
		"formmethod"?: any;
		"formnovalidate"?: any;
		"formtarget"?: any;
		"name"?: any;
		"type"?: any;
		"value"?: any;
	}

	interface CanvasElementProps extends DefaultElementEventProps {
		"height"?: any;
		"width"?: any;
	}

	interface CaptionElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface ColElementProps extends DefaultElementEventProps {
		"align"?: any;
		"char"?: any;
		"charoff"?: any;
		"span"?: any;
		"valign"?: any;
		"width"?: any;
	}

	interface ColgroupElementProps extends DefaultElementEventProps {
		"align"?: any;
		"char"?: any;
		"charoff"?: any;
		"span"?: any;
		"valign"?: any;
		"width"?: any;
	}

	interface DataElementProps extends DefaultElementEventProps {
		"value"?: any;
	}

	interface DelElementProps extends DefaultElementEventProps {
		"cite"?: any;
		"datetime"?: any;
	}

	interface DetailsElementProps extends DefaultElementEventProps {
		"open"?: any;
	}

	interface DialogElementProps extends DefaultElementEventProps {
		"open"?: any;
	}

	interface DirElementProps extends DefaultElementEventProps {
		"compact"?: any;
	}

	interface DivElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface DlElementProps extends DefaultElementEventProps {
		"compact"?: any;
	}

	interface EmbedElementProps extends DefaultElementEventProps {
		"height"?: any;
		"src"?: any;
		"type"?: any;
		"width"?: any;
	}

	interface FieldsetElementProps extends DefaultElementEventProps {
		"disabled"?: any;
		"form"?: any;
		"name"?: any;
	}

	interface FontElementProps extends DefaultElementEventProps {
		"color"?: any;
		"face"?: any;
		"size"?: any;
	}

	interface FormElementProps extends DefaultElementEventProps {
		"accept"?: any;
		"accept-charset"?: any;
		"action"?: any;
		"autocomplete"?: any;
		"enctype"?: any;
		"method"?: any;
		"name"?: any;
		"novalidate"?: any;
		"target"?: any;
	}

	interface FrameElementProps extends DefaultElementEventProps {
		"frameborder"?: any;
		"longdesc"?: any;
		"marginheight"?: any;
		"marginwidth"?: any;
		"name"?: any;
		"noresize"?: any;
		"scrolling"?: any;
		"src"?: any;
	}

	interface FramesetElementProps extends DefaultElementEventProps {
		"cols"?: any;
		"rows"?: any;
	}

	interface H1ElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface H2ElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface H3ElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface H4ElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface H5ElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface H6ElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface HeadElementProps extends DefaultElementEventProps {
		"profile"?: any;
	}

	interface HrElementProps extends DefaultElementEventProps {
		"align"?: any;
		"noshade"?: any;
		"size"?: any;
		"width"?: any;
	}

	interface HtmlElementProps extends DefaultElementEventProps {
		"manifest"?: any;
		"version"?: any;
	}

	interface IframeElementProps extends DefaultElementEventProps {
		"align"?: any;
		"allow"?: any;
		"allowfullscreen"?: any;
		"allowpaymentrequest"?: any;
		"allowusermedia"?: any;
		"frameborder"?: any;
		"height"?: any;
		"loading"?: any;
		"longdesc"?: any;
		"marginheight"?: any;
		"marginwidth"?: any;
		"name"?: any;
		"referrerpolicy"?: any;
		"sandbox"?: any;
		"scrolling"?: any;
		"src"?: any;
		"srcdoc"?: any;
		"width"?: any;
	}

	interface ImgElementProps extends DefaultElementEventProps {
		"align"?: any;
		"alt"?: any;
		"border"?: any;
		"crossorigin"?: any;
		"decoding"?: any;
		"height"?: any;
		"hspace"?: any;
		"ismap"?: any;
		"loading"?: any;
		"longdesc"?: any;
		"name"?: any;
		"referrerpolicy"?: any;
		"sizes"?: any;
		"src"?: any;
		"srcset"?: any;
		"usemap"?: any;
		"vspace"?: any;
		"width"?: any;
	}

	interface InputElementProps extends DefaultElementEventProps {
		"accept"?: any;
		"align"?: any;
		"alt"?: any;
		"autocomplete"?: any;
		"checked"?: any;
		"dirname"?: any;
		"disabled"?: any;
		"form"?: any;
		"formaction"?: any;
		"formenctype"?: any;
		"formmethod"?: any;
		"formnovalidate"?: any;
		"formtarget"?: any;
		"height"?: any;
		"ismap"?: any;
		"list"?: any;
		"max"?: any;
		"maxlength"?: any;
		"min"?: any;
		"minlength"?: any;
		"multiple"?: any;
		"name"?: any;
		"pattern"?: any;
		"placeholder"?: any;
		"readonly"?: any;
		"required"?: any;
		"size"?: any;
		"src"?: any;
		"step"?: any;
		"type"?: any;
		"usemap"?: any;
		"value"?: any;
		"width"?: any;
	}

	interface InsElementProps extends DefaultElementEventProps {
		"cite"?: any;
		"datetime"?: any;
	}

	interface IsindexElementProps extends DefaultElementEventProps {
		"prompt"?: any;
	}

	interface LabelElementProps extends DefaultElementEventProps {
		"for"?: any;
		"form"?: any;
	}

	interface LegendElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface LiElementProps extends DefaultElementEventProps {
		"type"?: any;
		"value"?: any;
	}

	interface LinkElementProps extends DefaultElementEventProps {
		"as"?: any;
		"charset"?: any;
		"color"?: any;
		"crossorigin"?: any;
		"disabled"?: any;
		"href"?: any;
		"hreflang"?: any;
		"imagesizes"?: any;
		"imagesrcset"?: any;
		"integrity"?: any;
		"media"?: any;
		"referrerpolicy"?: any;
		"rel"?: any;
		"rev"?: any;
		"sizes"?: any;
		"target"?: any;
		"type"?: any;
	}

	interface MapElementProps extends DefaultElementEventProps {
		"name"?: any;
	}

	interface MenuElementProps extends DefaultElementEventProps {
		"compact"?: any;
	}

	interface MetaElementProps extends DefaultElementEventProps {
		"charset"?: any;
		"content"?: any;
		"http-equiv"?: any;
		"name"?: any;
		"scheme"?: any;
	}

	interface MeterElementProps extends DefaultElementEventProps {
		"high"?: any;
		"low"?: any;
		"max"?: any;
		"min"?: any;
		"optimum"?: any;
		"value"?: any;
	}

	interface ObjectElementProps extends DefaultElementEventProps {
		"align"?: any;
		"archive"?: any;
		"border"?: any;
		"classid"?: any;
		"codebase"?: any;
		"codetype"?: any;
		"data"?: any;
		"declare"?: any;
		"form"?: any;
		"height"?: any;
		"hspace"?: any;
		"name"?: any;
		"standby"?: any;
		"type"?: any;
		"typemustmatch"?: any;
		"usemap"?: any;
		"vspace"?: any;
		"width"?: any;
	}

	interface OlElementProps extends DefaultElementEventProps {
		"compact"?: any;
		"reversed"?: any;
		"start"?: any;
		"type"?: any;
	}

	interface OptgroupElementProps extends DefaultElementEventProps {
		"disabled"?: any;
		"label"?: any;
	}

	interface OptionElementProps extends DefaultElementEventProps {
		"disabled"?: any;
		"label"?: any;
		"selected"?: any;
		"value"?: any;
	}

	interface OutputElementProps extends DefaultElementEventProps {
		"for"?: any;
		"form"?: any;
		"name"?: any;
	}

	interface PElementProps extends DefaultElementEventProps {
		"align"?: any;
	}

	interface ParamElementProps extends DefaultElementEventProps {
		"name"?: any;
		"type"?: any;
		"value"?: any;
		"valuetype"?: any;
	}

	interface PreElementProps extends DefaultElementEventProps {
		"width"?: any;
	}

	interface ProgressElementProps extends DefaultElementEventProps {
		"max"?: any;
		"value"?: any;
	}

	interface QElementProps extends DefaultElementEventProps {
		"cite"?: any;
	}

	interface ScriptElementProps extends DefaultElementEventProps {
		"async"?: any;
		"charset"?: any;
		"crossorigin"?: any;
		"defer"?: any;
		"integrity"?: any;
		"language"?: any;
		"nomodule"?: any;
		"referrerpolicy"?: any;
		"src"?: any;
		"type"?: any;
	}

	interface SelectElementProps extends DefaultElementEventProps {
		"autocomplete"?: any;
		"disabled"?: any;
		"form"?: any;
		"multiple"?: any;
		"name"?: any;
		"required"?: any;
		"size"?: any;
	}

	interface SlotElementProps extends DefaultElementEventProps {
		"name"?: any;
	}

	interface SourceElementProps extends DefaultElementEventProps {
		"height"?: any;
		"media"?: any;
		"sizes"?: any;
		"src"?: any;
		"srcset"?: any;
		"type"?: any;
		"width"?: any;
	}

	interface StyleElementProps extends DefaultElementEventProps {
		"media"?: any;
		"type"?: any;
	}

	interface TableElementProps extends DefaultElementEventProps {
		"align"?: any;
		"bgcolor"?: any;
		"border"?: any;
		"cellpadding"?: any;
		"cellspacing"?: any;
		"frame"?: any;
		"rules"?: any;
		"summary"?: any;
		"width"?: any;
	}

	interface TbodyElementProps extends DefaultElementEventProps {
		"align"?: any;
		"char"?: any;
		"charoff"?: any;
		"valign"?: any;
	}

	interface TdElementProps extends DefaultElementEventProps {
		"abbr"?: any;
		"align"?: any;
		"axis"?: any;
		"bgcolor"?: any;
		"char"?: any;
		"charoff"?: any;
		"colspan"?: any;
		"headers"?: any;
		"height"?: any;
		"nowrap"?: any;
		"rowspan"?: any;
		"scope"?: any;
		"valign"?: any;
		"width"?: any;
	}

	interface TextareaElementProps extends DefaultElementEventProps {
		"autocomplete"?: any;
		"cols"?: any;
		"dirname"?: any;
		"disabled"?: any;
		"form"?: any;
		"maxlength"?: any;
		"minlength"?: any;
		"name"?: any;
		"placeholder"?: any;
		"readonly"?: any;
		"required"?: any;
		"rows"?: any;
		"wrap"?: any;
	}

	interface TfootElementProps extends DefaultElementEventProps {
		"align"?: any;
		"char"?: any;
		"charoff"?: any;
		"valign"?: any;
	}

	interface ThElementProps extends DefaultElementEventProps {
		"abbr"?: any;
		"align"?: any;
		"axis"?: any;
		"bgcolor"?: any;
		"char"?: any;
		"charoff"?: any;
		"colspan"?: any;
		"headers"?: any;
		"height"?: any;
		"nowrap"?: any;
		"rowspan"?: any;
		"scope"?: any;
		"valign"?: any;
		"width"?: any;
	}

	interface TheadElementProps extends DefaultElementEventProps {
		"align"?: any;
		"char"?: any;
		"charoff"?: any;
		"valign"?: any;
	}

	interface TimeElementProps extends DefaultElementEventProps {
		"datetime"?: any;
	}

	interface TrElementProps extends DefaultElementEventProps {
		"align"?: any;
		"bgcolor"?: any;
		"char"?: any;
		"charoff"?: any;
		"valign"?: any;
	}

	interface TrackElementProps extends DefaultElementEventProps {
		"default"?: any;
		"kind"?: any;
		"label"?: any;
		"src"?: any;
		"srclang"?: any;
	}

	interface UlElementProps extends DefaultElementEventProps {
		"compact"?: any;
		"type"?: any;
	}

	interface VideoElementProps extends DefaultElementEventProps {
		"autoplay"?: any;
		"controls"?: any;
		"crossorigin"?: any;
		"height"?: any;
		"loop"?: any;
		"muted"?: any;
		"playsinline"?: any;
		"poster"?: any;
		"preload"?: any;
		"src"?: any;
		"width"?: any;
	}

	interface DefaultSvgElementProps {
		"about"?: any;
		"class"?: any;
		"content"?: any;
		"datatype"?: any;
		"id"?: any;
		"lang"?: any;
		"property"?: any;
		"rel"?: any;
		"resource"?: any;
		"rev"?: any;
		"style"?: CSS;
		"tabindex"?: any;
		"typeof"?: any;
	}

	interface ASvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"download"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"href"?: any;
		"hreflang"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"ping"?: any;
		"pointer-events"?: any;
		"referrerpolicy"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"target"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"type"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface AltglyphSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dx"?: any;
		"dy"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"format"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"glyphRef"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"rotate"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface AnimateSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: any;
		"additive"?: any;
		"alignment-baseline"?: any;
		"attributeName"?: any;
		"attributeType"?: any;
		"baseline-shift"?: any;
		"begin"?: any;
		"by"?: any;
		"calcMode"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dur"?: any;
		"enable-background"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"from"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"keySplines"?: any;
		"keyTimes"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"max"?: any;
		"min"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"to"?: any;
		"unicode-bidi"?: any;
		"values"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface AnimatecolorSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: any;
		"additive"?: any;
		"alignment-baseline"?: any;
		"attributeName"?: any;
		"attributeType"?: any;
		"baseline-shift"?: any;
		"begin"?: any;
		"by"?: any;
		"calcMode"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dur"?: any;
		"enable-background"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"from"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"keySplines"?: any;
		"keyTimes"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"max"?: any;
		"min"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"to"?: any;
		"unicode-bidi"?: any;
		"values"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface AnimatemotionSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: any;
		"additive"?: any;
		"begin"?: any;
		"by"?: any;
		"calcMode"?: any;
		"dur"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"from"?: any;
		"href"?: any;
		"keyPoints"?: any;
		"keySplines"?: any;
		"keyTimes"?: any;
		"max"?: any;
		"min"?: any;
		"origin"?: any;
		"path"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"rotate"?: any;
		"systemLanguage"?: any;
		"to"?: any;
		"values"?: any;
	}

	interface AnimatetransformSvgElementProps extends DefaultSvgElementEventProps {
		"accumulate"?: any;
		"additive"?: any;
		"attributeName"?: any;
		"attributeType"?: any;
		"begin"?: any;
		"by"?: any;
		"calcMode"?: any;
		"dur"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"from"?: any;
		"href"?: any;
		"keySplines"?: any;
		"keyTimes"?: any;
		"max"?: any;
		"min"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"systemLanguage"?: any;
		"to"?: any;
		"type"?: any;
		"values"?: any;
	}

	interface AnimationSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: any;
		"dur"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"height"?: any;
		"initialVisibility"?: any;
		"max"?: any;
		"min"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"preserveAspectRatio"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"syncBehavior"?: any;
		"syncMaster"?: any;
		"syncTolerance"?: any;
		"systemLanguage"?: any;
		"transform"?: any;
		"width"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface AudioSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: any;
		"dur"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"max"?: any;
		"min"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"syncBehavior"?: any;
		"syncMaster"?: any;
		"syncTolerance"?: any;
		"systemLanguage"?: any;
		"type"?: any;
	}

	interface CanvasSvgElementProps extends DefaultSvgElementEventProps {
		"preserveAspectRatio"?: any;
		"requiredExtensions"?: any;
		"systemLanguage"?: any;
	}

	interface CircleSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"cx"?: any;
		"cy"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pathLength"?: any;
		"pointer-events"?: any;
		"r"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface ClippathSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"clipPathUnits"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface ColorprofileSvgElementProps extends DefaultSvgElementEventProps {
		"local"?: any;
		"name"?: any;
		"rendering-intent"?: any;
	}

	interface CursorSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"systemLanguage"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface DefsSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface DescSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"systemLanguage"?: any;
	}

	interface DiscardSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: any;
		"href"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"systemLanguage"?: any;
	}

	interface EllipseSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"cx"?: any;
		"cy"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pathLength"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"rx"?: any;
		"ry"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface FeblendSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"in2"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"mode"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FecolormatrixSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"type"?: any;
		"unicode-bidi"?: any;
		"values"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FecomponenttransferSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FecompositeSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"in2"?: any;
		"k1"?: any;
		"k2"?: any;
		"k3"?: any;
		"k4"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"operator"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FeconvolvematrixSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"bias"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"divisor"?: any;
		"dominant-baseline"?: any;
		"edgeMode"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kernelMatrix"?: any;
		"kernelUnitLength"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"order"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"preserveAlpha"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"targetX"?: any;
		"targetY"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FediffuselightingSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"diffuseConstant"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kernelUnitLength"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"surfaceScale"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FedisplacementmapSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"in2"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"scale"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"xChannelSelector"?: any;
		"y"?: any;
		"yChannelSelector"?: any;
	}

	interface FedistantlightSvgElementProps extends DefaultSvgElementEventProps {
		"azimuth"?: any;
		"elevation"?: any;
	}

	interface FedropshadowSvgElementProps extends DefaultSvgElementEventProps {
		"dx"?: any;
		"dy"?: any;
		"height"?: any;
		"in"?: any;
		"result"?: any;
		"stdDeviation"?: any;
		"width"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FefloodSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FefuncaSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: any;
		"exponent"?: any;
		"intercept"?: any;
		"offset"?: any;
		"slope"?: any;
		"tableValues"?: any;
		"type"?: any;
	}

	interface FefuncbSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: any;
		"exponent"?: any;
		"intercept"?: any;
		"offset"?: any;
		"slope"?: any;
		"tableValues"?: any;
		"type"?: any;
	}

	interface FefuncgSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: any;
		"exponent"?: any;
		"intercept"?: any;
		"offset"?: any;
		"slope"?: any;
		"tableValues"?: any;
		"type"?: any;
	}

	interface FefuncrSvgElementProps extends DefaultSvgElementEventProps {
		"amplitude"?: any;
		"exponent"?: any;
		"intercept"?: any;
		"offset"?: any;
		"slope"?: any;
		"tableValues"?: any;
		"type"?: any;
	}

	interface FegaussianblurSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"edgeMode"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stdDeviation"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FeimageSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"crossorigin"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"preserveAspectRatio"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FemergeSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FemergenodeSvgElementProps extends DefaultSvgElementEventProps {
		"in"?: any;
	}

	interface FemorphologySvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"operator"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"radius"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FeoffsetSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dx"?: any;
		"dy"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FepointlightSvgElementProps extends DefaultSvgElementEventProps {
		"x"?: any;
		"y"?: any;
		"z"?: any;
	}

	interface FespecularlightingSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kernelUnitLength"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"specularConstant"?: any;
		"specularExponent"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"surfaceScale"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FespotlightSvgElementProps extends DefaultSvgElementEventProps {
		"limitingConeAngle"?: any;
		"pointsAtX"?: any;
		"pointsAtY"?: any;
		"pointsAtZ"?: any;
		"specularExponent"?: any;
		"x"?: any;
		"y"?: any;
		"z"?: any;
	}

	interface FetileSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"in"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FeturbulenceSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseFrequency"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"numOctaves"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"result"?: any;
		"seed"?: any;
		"shape-rendering"?: any;
		"stitchTiles"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"type"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FilterSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"filterRes"?: any;
		"filterUnits"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"primitiveUnits"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface FontSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"horiz-adv-x"?: any;
		"horiz-origin-x"?: any;
		"horiz-origin-y"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"vert-adv-y"?: any;
		"vert-origin-x"?: any;
		"vert-origin-y"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface FontfaceSvgElementProps extends DefaultSvgElementEventProps {
		"accent-height"?: any;
		"alphabetic"?: any;
		"ascent"?: any;
		"bbox"?: any;
		"cap-height"?: any;
		"descent"?: any;
		"externalResourcesRequired"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"hanging"?: any;
		"ideographic"?: any;
		"mathematical"?: any;
		"overline-position"?: any;
		"overline-thickness"?: any;
		"panose-1"?: any;
		"slope"?: any;
		"stemh"?: any;
		"stemv"?: any;
		"strikethrough-position"?: any;
		"strikethrough-thickness"?: any;
		"underline-position"?: any;
		"underline-thickness"?: any;
		"unicode-range"?: any;
		"units-per-em"?: any;
		"v-alphabetic"?: any;
		"v-hanging"?: any;
		"v-ideographic"?: any;
		"v-mathematical"?: any;
		"widths"?: any;
		"x-height"?: any;
	}

	interface FontfaceformatSvgElementProps extends DefaultSvgElementEventProps {
		"string"?: any;
	}

	interface FontfacenameSvgElementProps extends DefaultSvgElementEventProps {
		"name"?: any;
	}

	interface FontfaceuriSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: any;
	}

	interface ForeignobjectSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface GSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface GlyphSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"arabic-form"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"d"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-name"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"horiz-adv-x"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"orientation"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode"?: any;
		"unicode-bidi"?: any;
		"vert-adv-y"?: any;
		"vert-origin-x"?: any;
		"vert-origin-y"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface GlyphrefSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dx"?: any;
		"dy"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"format"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"glyphRef"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface HandlerSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: any;
		"type"?: any;
	}

	interface HkernSvgElementProps extends DefaultSvgElementEventProps {
		"g1"?: any;
		"g2"?: any;
		"k"?: any;
		"u1"?: any;
		"u2"?: any;
	}

	interface IframeSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: any;
		"systemLanguage"?: any;
	}

	interface ImageSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"crossorigin"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"preserveAspectRatio"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"type"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface LineSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pathLength"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x1"?: any;
		"x2"?: any;
		"y1"?: any;
		"y2"?: any;
	}

	interface LineargradientSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"gradientTransform"?: any;
		"gradientUnits"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"shape-rendering"?: any;
		"spreadMethod"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x1"?: any;
		"x2"?: any;
		"y1"?: any;
		"y2"?: any;
	}

	interface ListenerSvgElementProps extends DefaultSvgElementEventProps {
		"defaultAction"?: any;
		"event"?: any;
		"handler"?: any;
		"observer"?: any;
		"phase"?: any;
		"propagate"?: any;
		"target"?: any;
	}

	interface MarkerSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"markerHeight"?: any;
		"markerUnits"?: any;
		"markerWidth"?: any;
		"mask"?: any;
		"opacity"?: any;
		"orient"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"preserveAspectRatio"?: any;
		"refX"?: any;
		"refY"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"viewBox"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface MaskSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"maskContentUnits"?: any;
		"maskUnits"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface MetadataSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"systemLanguage"?: any;
	}

	interface MissingglyphSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"d"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"horiz-adv-x"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"vert-adv-y"?: any;
		"vert-origin-x"?: any;
		"vert-origin-y"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface MpathSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: any;
		"href"?: any;
	}

	interface PathSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"d"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pathLength"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface PatternSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"patternContentUnits"?: any;
		"patternTransform"?: any;
		"patternUnits"?: any;
		"pointer-events"?: any;
		"preserveAspectRatio"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"viewBox"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface PolygonSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pathLength"?: any;
		"pointer-events"?: any;
		"points"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface PolylineSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pathLength"?: any;
		"pointer-events"?: any;
		"points"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface PrefetchSvgElementProps extends DefaultSvgElementEventProps {
		"bandwidth"?: any;
		"mediaCharacterEncoding"?: any;
		"mediaContentEncodings"?: any;
		"mediaSize"?: any;
		"mediaTime"?: any;
	}

	interface RadialgradientSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"cx"?: any;
		"cy"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"fr"?: any;
		"fx"?: any;
		"fy"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"gradientTransform"?: any;
		"gradientUnits"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"r"?: any;
		"shape-rendering"?: any;
		"spreadMethod"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface RectSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pathLength"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"rx"?: any;
		"ry"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface ScriptSvgElementProps extends DefaultSvgElementEventProps {
		"crossorigin"?: any;
		"externalResourcesRequired"?: any;
		"href"?: any;
		"type"?: any;
	}

	interface SetSvgElementProps extends DefaultSvgElementEventProps {
		"attributeName"?: any;
		"attributeType"?: any;
		"begin"?: any;
		"dur"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"href"?: any;
		"max"?: any;
		"min"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"systemLanguage"?: any;
		"to"?: any;
	}

	interface StopSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"offset"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface StyleSvgElementProps extends DefaultSvgElementEventProps {
		"media"?: any;
		"title"?: any;
		"type"?: any;
	}

	interface SvgSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseProfile"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"contentScriptType"?: any;
		"contentStyleType"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"playbackOrder"?: any;
		"playbackorder"?: any;
		"pointer-events"?: any;
		"preserveAspectRatio"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"shape-rendering"?: any;
		"snapshotTime"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"syncBehaviorDefault"?: any;
		"syncToleranceDefault"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"timelineBegin"?: any;
		"timelinebegin"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"version"?: any;
		"viewBox"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
		"zoomAndPan"?: any;
	}

	interface SwitchSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface SymbolSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"preserveAspectRatio"?: any;
		"refX"?: any;
		"refY"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"unicode-bidi"?: any;
		"viewBox"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface TbreakSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"systemLanguage"?: any;
	}

	interface TextSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dx"?: any;
		"dy"?: any;
		"editable"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"lengthAdjust"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"rotate"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"textLength"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface TextareaSvgElementProps extends DefaultSvgElementEventProps {
		"editable"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"height"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"systemLanguage"?: any;
		"transform"?: any;
		"width"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface TextpathSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"lengthAdjust"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"method"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"path"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"shape-rendering"?: any;
		"side"?: any;
		"spacing"?: any;
		"startOffset"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"textLength"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
	}

	interface TitleSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"systemLanguage"?: any;
	}

	interface TrefSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dx"?: any;
		"dy"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"lengthAdjust"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"rotate"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"textLength"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface TspanSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"dx"?: any;
		"dy"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"lengthAdjust"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"rotate"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"textLength"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface UnknownSvgElementProps extends DefaultSvgElementEventProps {
		"requiredExtensions"?: any;
		"systemLanguage"?: any;
	}

	interface UseSvgElementProps extends DefaultSvgElementEventProps {
		"alignment-baseline"?: any;
		"baseline-shift"?: any;
		"clip"?: any;
		"clip-path"?: any;
		"clip-rule"?: any;
		"color"?: any;
		"color-interpolation"?: any;
		"color-interpolation-filters"?: any;
		"color-profile"?: any;
		"color-rendering"?: any;
		"cursor"?: any;
		"direction"?: any;
		"display"?: any;
		"dominant-baseline"?: any;
		"enable-background"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"fill-opacity"?: any;
		"fill-rule"?: any;
		"filter"?: any;
		"flood-color"?: any;
		"flood-opacity"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"font-family"?: any;
		"font-size"?: any;
		"font-size-adjust"?: any;
		"font-stretch"?: any;
		"font-style"?: any;
		"font-variant"?: any;
		"font-weight"?: any;
		"glyph-orientation-horizontal"?: any;
		"glyph-orientation-vertical"?: any;
		"height"?: any;
		"href"?: any;
		"image-rendering"?: any;
		"kerning"?: any;
		"letter-spacing"?: any;
		"lighting-color"?: any;
		"marker-end"?: any;
		"marker-mid"?: any;
		"marker-start"?: any;
		"mask"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"opacity"?: any;
		"overflow"?: any;
		"pointer-events"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"shape-rendering"?: any;
		"stop-color"?: any;
		"stop-opacity"?: any;
		"stroke"?: any;
		"stroke-dasharray"?: any;
		"stroke-dashoffset"?: any;
		"stroke-linecap"?: any;
		"stroke-linejoin"?: any;
		"stroke-miterlimit"?: any;
		"stroke-opacity"?: any;
		"stroke-width"?: any;
		"systemLanguage"?: any;
		"text-anchor"?: any;
		"text-decoration"?: any;
		"text-rendering"?: any;
		"transform"?: any;
		"unicode-bidi"?: any;
		"visibility"?: any;
		"width"?: any;
		"word-spacing"?: any;
		"writing-mode"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface VideoSvgElementProps extends DefaultSvgElementEventProps {
		"begin"?: any;
		"dur"?: any;
		"end"?: any;
		"externalResourcesRequired"?: any;
		"fill"?: any;
		"focusHighlight"?: any;
		"focusable"?: any;
		"height"?: any;
		"initialVisibility"?: any;
		"max"?: any;
		"min"?: any;
		"nav-down"?: any;
		"nav-down-left"?: any;
		"nav-down-right"?: any;
		"nav-left"?: any;
		"nav-next"?: any;
		"nav-prev"?: any;
		"nav-right"?: any;
		"nav-up"?: any;
		"nav-up-left"?: any;
		"nav-up-right"?: any;
		"overlay"?: any;
		"preserveAspectRatio"?: any;
		"repeatCount"?: any;
		"repeatDur"?: any;
		"requiredExtensions"?: any;
		"requiredFeatures"?: any;
		"requiredFonts"?: any;
		"requiredFormats"?: any;
		"restart"?: any;
		"syncBehavior"?: any;
		"syncMaster"?: any;
		"syncTolerance"?: any;
		"systemLanguage"?: any;
		"transform"?: any;
		"transformBehavior"?: any;
		"type"?: any;
		"width"?: any;
		"x"?: any;
		"y"?: any;
	}

	interface ViewSvgElementProps extends DefaultSvgElementEventProps {
		"externalResourcesRequired"?: any;
		"preserveAspectRatio"?: any;
		"viewBox"?: any;
		"viewTarget"?: any;
		"zoomAndPan"?: any;
	}

	interface VkernSvgElementProps extends DefaultSvgElementEventProps {
		"g1"?: any;
		"g2"?: any;
		"k"?: any;
		"u1"?: any;
		"u2"?: any;
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

    interface CSS extends _CSS.StandardProperties<number | string>, _CSS.SvgProperties<number | string> {
        [key: string]: any;
    }

    interface BrowserCommandElementRefOptions {
        wait?: boolean;
        ref?: string;
        customSelector?: string;
    }

    interface DraymanComponent<Props = void, EventHubExtend = void, BrowserExtend = void, DataExtend = void, ServerExtend = void> {
        (data: {
            props: Props;
            forceUpdate: () => Promise<void>;
            EventHub: {
                on(eventName: string, event: ((payload: any) => any), groupId?: string): any;
                emit(eventName: string, data: any, groupId?: string): any;
            } & EventHubExtend;
            Browser: {
                [command: string]: (options?: any, elementRefs?: Array<string | BrowserCommandElementRefOptions>) => Promise<any>
            } & BrowserExtend;
            Server: {
                [command: string]: (options?: any) => Promise<any>
            } & ServerExtend;
            ComponentInstance: {
                id: string;
                onDestroy: (() => Promise<void>) | (() => void);
                onInit: (() => Promise<void>) | (() => void);
            }
        } & DataExtend): any;
    }

    interface DraymanServer {
        (data: {
            emit: (callback: any, data?: any) => Promise<void>;
            app: any;
            EventHub: {
                on(eventName: string, event: ((payload: any) => any), groupId?: string): any;
                emit(eventName: string, data: any, groupId?: string): any;
            }
        }): any;
    }
}

export { };
