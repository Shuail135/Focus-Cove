import bg from "../assets/background.png";

export default function Background() {
    return (
        <div className="absolute inset-0 z-0">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="absolute inset-0 bg-[#3b3b6c]/70" />
        </div>
    );
}