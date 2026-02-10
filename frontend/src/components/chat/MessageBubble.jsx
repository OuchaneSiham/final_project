


// sahred :
{/*
    padding : px-2 px-4;
    Max-width: max-w-md
    Min-width: min-w-[80px];
    shadow: shadow-md;
    Tetxt-color: text-white;
    Word-breaking: break-words;
    border : rounded-2xl;
    Transation: transation-all duration-200
//font
    font size: text-xs;
    capacity: text-white/70 
    alignment : text-right;

//Margin: mb-4/3 
*/}
{/*
    if i'am the sender === issent === true
    Key differences:
    rounded-tr-none;
    Alignement : Right sidel;]

*/}
export default function MessageBubble({isSent, Message})
{
    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="min-w-[80px] rounded-2xl flex bg-blue-200  max-w-md px-4 py-3 break-words">
                <p>fkkfkfkdfkdflkjdkjghdkjghdfkghdfkghdkjghdg</p>
            </div>
        </div>
    );
}