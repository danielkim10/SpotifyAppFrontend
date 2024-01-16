// mui icons
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";

const CoverImage = (props: {id: string, url: string, size: string}) => {
    const { id, url, size } = props;

    return (
        <>
            {
                url ?
                    <img src={url} className={size === "l" ? "custom-image-cover-l" : size === "m" ? "custom-image-cover-m" : "custom-image-cover-s"} alt=""/>
                :
                id === "liked-songs" ?
                    <div className={size === "l" ? "liked-songs-cover-l" : size === "m" ? "liked-songs-cover-m" : "liked-songs-cover-s"}>
                        <FavoriteRoundedIcon className="image-icon"/>
                    </div>
                :
                <div className={size === "l" ? "no-image-cover-l" : size === "m" ? "no-image-cover-m" : "no-image-cover-s"}>
                    <MusicNoteRoundedIcon className="image-icon"/>
                </div>
            }
        </>
    );
}

export default CoverImage;