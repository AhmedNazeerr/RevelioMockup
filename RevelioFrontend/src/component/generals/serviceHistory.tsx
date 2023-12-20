import React from "react";
import { Border, Heading } from "../commons";

const decodeHtml = (html: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
};
const ServiceHistory: React.FC<{ serviceHistory: string }> = ({ serviceHistory }) => {
    const decodedHTML = decodeHtml(serviceHistory)
    return (
        <div className="pl-7">
            <div>
                <Heading heading="Service History" />
                <Border />
            </div>
            <div className="py-3 pl-4">
                <div dangerouslySetInnerHTML={{ __html: decodedHTML }} />
            </div>
        </div>
    )
}

export default ServiceHistory;