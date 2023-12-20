import { Border, Heading } from "../commons";
import React from "react";

const decodeHtml = (html: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
};
const Specification: React.FC<{ specification: string }> = ({ specification }) => {
    const decodedHTML = decodeHtml(specification)
    return (
        <div className="px-7 py-5">
            <div>
                <Heading heading="Specifications" />
                <Border />
            </div>
            <div className="pt-2.5 custom-list">
                <div dangerouslySetInnerHTML={{ __html: decodedHTML }} />
            </div>
        </div>
    )
}

export default Specification;