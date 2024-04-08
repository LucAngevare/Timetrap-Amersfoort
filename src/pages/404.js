import { Link } from 'react-router-dom';
import '../css/style.css';

function pageNotFound(){
    return (
        <div class="container-404">
            <div class="centered">
                <h1 class="not-found-text">Pagina niet gevonden</h1>
                <p class="info-text">De pagina waar je naar zocht bestaat niet. De pagina kan verplaatst zijn, verwijderd zijn of heeft nooit bestaan.</p>
                <br/>
                <Link to="/"><button class="home-btn">Terug naar home</button></Link>
            </div>
        </div>
    )
}

export default pageNotFound;