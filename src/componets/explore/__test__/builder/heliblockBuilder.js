export const aHelilbock = (id) => {
    const heliblockBase = {
        description: "",
        lastUpdate: {_seconds: 1593790352, _nanoseconds: 425000000},
        objectID: id,
        screenshot: "sceenshot.png",
        source: {
            html: "<div>html</div>",
            css: ".hb_OFluEE-D {}.hb_OFluEE-D ._feature_OFluEE-D {}",
            variables: [[{
                label: "Icon background",
                type: "color",
                value: "#f05252",
                variable: "--hb-color-icon-background",
            }]],
            wrapperClassname: "hb_OFluEE-D",
            alignment: "normal"
        },
        tags: [],
        title: "Features icons"
    }
    return {
        withScreenshot(screenshot){
            heliblockBase.screenshot = screenshot
            return this
        },
        withTitle(title) {
            heliblockBase.title = title
            return this
        },
        build(){
            return heliblockBase
        }
    }
}