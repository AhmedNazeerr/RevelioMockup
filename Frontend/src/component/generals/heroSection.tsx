import { Border, Heading } from "../commons";
import pattern from '../../assets/Group 6.png'

const HeroSection: React.FC<{ make: string, model: string, varient: string, askingPrice: number, capClean: number, autoTraderDetail: string }> = ({ make, model, varient, autoTraderDetail, askingPrice, capClean }) => {
    return (
        <div className="pl-7">
            <div>
                <Heading heading={make + " " + model + " " + varient} />
                <Border />
            </div>
            <div className="pt-2 pb-7 flex gap-1 text-[1.125rem]">
                <p>{model}</p>
                <p>{varient}</p>
            </div>
            <div className="flex flex-col gap-1.5 text-[1.063rem]">
                <div className="flex items-center gap-1.5">
                    <img className="w-4 h-4" src={pattern} alt="pattern" />
                    <p>Asking Price - £{askingPrice}. Zero fees apply!!</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <img className="w-4 h-4" src={pattern} alt="pattern" />
                    <p>Cap Clean - £{capClean}</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <img className="w-4 h-4" src={pattern} alt="pattern" />
                    <p>Autotrader Retail - £{autoTraderDetail}</p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;