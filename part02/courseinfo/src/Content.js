import Parts from './Parts';
import Total from './Total';

const Content = ( {parts} ) => {
    return (
        <>
            <Parts parts={parts} />
            <Total parts={parts} />
        </>
    )
}

export default Content;