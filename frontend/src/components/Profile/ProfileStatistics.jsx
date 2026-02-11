import Box from "./box";


export default function ProfileStatistics()
{
    return(
        <div className="flex flex-col ">
            <p className="">
                Game Statistics
            </p>
            <div className="grid place-items-start justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 bg-black/40 h-full rounded-lg overflow-y-auto min-h-0">
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
            </div>
        </div>
    );
}