import { Border, Heading } from "../commons";

const decodeHtml = (html: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
};
const InfoSection : React.FC<{about: string}> = ({about}) => {
    const decodedHTML = decodeHtml(about)
    return (
        <div className="px-7">
            <div>
                <Heading heading="About the Car:" />
                <Border />
            </div>
            <div className="text-[0.875rem] pt-2" dangerouslySetInnerHTML={{ __html: decodedHTML }} />
        </div>
    )
}

export default InfoSection;