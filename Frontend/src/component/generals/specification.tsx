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
            <div className="custom-list text-[0.875rem] pt-3">
                <div dangerouslySetInnerHTML={{ __html: decodedHTML }} />
            </div>
        </div>
    )
}

export default Specification;