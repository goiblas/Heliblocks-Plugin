import {useEffect, useState } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";
import { restoreClassnameLinks } from "../../../utils";

export const linkProcessor = {
  priority: 0,
  name: "link@v1",
  test: function(node) {
    return node.name && node.name === "a";
  },
  edit: ({ attributes, id, value, setValue }) => {
        const [innerValue, setInnerValue] = useState("");
        useEffect(() => {
            if(value.startsWith("<a")) {
                setInnerValue(value)
            }else {
                setInnerValue(`<a href="${attributes.href || "#"}" class="${attributes.className || ""}">${value}</a>`)
            }
        }, [value]);
    
        const onChange = content => {
            setValue(restoreClassnameLinks(innerValue, content));
        };
        return (
            <RichText
                value={innerValue}
                onChange={onChange}
                tagName="div"
                key={id}
        />
        );
  },
  save: ({ attributes, id, value }) => {
    let content = value; 
    if(!value.startsWith("<a")) {
        content = `<a href="${attributes.href}" class="${attributes.className}">${value}</a>`;
    }

    return <RichText.Content value={value} tagName="div" key={id} />
    ;
  }
};