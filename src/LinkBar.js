
import { Link } from "react-router-dom";

function LinkBar() {

    return (
        <div>
            <h5>Daftar Chart</h5>
            <nav>
                <ul>
                    <li><Link to="Rechart">Rechart</Link></li>
                    <li><Link to="GoogleChart">GoogleChart</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default LinkBar;
