import { HeadingInterafce } from "./type";

const Heading:React.FC<HeadingInterafce> = ({heading}) => {
    return(
        <div className="text-[1.75rem] font-bold">{heading}</div>
    )
}

export default Heading;