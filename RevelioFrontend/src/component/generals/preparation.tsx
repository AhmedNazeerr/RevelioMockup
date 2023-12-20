import React from "react";
import { Border, Heading } from "../commons";


const decodeHtml = (html: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
};
const Preparation: React.FC<{ preparation: string }> = ({ preparation }) => {
    const decodedHTML = decodeHtml(preparation)
    return (
        <div className="pl-7">
            <div>
                <Heading heading="Preparation" />
                <Border />
            </div>
            <ul className="pt-3 pl-4 list-disc">
                <div dangerouslySetInnerHTML={{ __html: decodedHTML }} />
            </ul>
        </div>
    )
}

export default Preparation;