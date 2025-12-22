import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Error404({title}: {title:string}) {
    return (
        <>
            <h1> Page Not Found - {title}</h1>
            <div>
                <Button
                    variant="link"
                    className="m-2 read-only:bg-gray-300"
                    asChild
                >
                    <Link to="/">Home Page</Link>
                </Button>
                <img className="w-full" src="/src/assets/images/image.jpg" />
            </div>
        </>
    );
}

export default Error404;