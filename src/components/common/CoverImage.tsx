import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';

const CoverImage = (props: {id: string, url: string, size: string, canEdit?: boolean}) => {
    const { id, url, size, canEdit } = props;

    const sizes: {[key:string]:string} = {
        'l': 'w-[150px] h-[150px]',
        'm': 'min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]',
        's': 'w-[50px] h-[50px]'
    };

    return (
        <>
            {
                url ?
                    <img src={url} className={`${sizes[size]} flex bg-grey object-cover float-left rounded ${canEdit ? 'cursor-pointer' : 'cursor-auto'}`} alt="" loading="lazy"/>
                :
                id === "liked-songs" ?
                    <div id="liked-songs-cover" className={`${sizes[size]} flex bg-grey bg-liked-songs-cover float-left rounded ${canEdit ? 'cursor-pointer' : 'cursor-auto'}`}>
                        <FavoriteRoundedIcon className="text-lg m-auto"/>
                    </div>
                :
                <div id="no-cover" className={`${sizes[size]} flex bg-grey float-left rounded ${canEdit ? 'cursor-pointer' : 'cursor-auto'}`}>
                    <MusicNoteRoundedIcon className="text-lg m-auto"/>
                </div>
            }
        </>
    );
}

export default CoverImage;