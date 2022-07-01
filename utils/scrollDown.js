export default function scrollDown(id) {

    console.log(id)

    if (id) {
        setTimeout(() => {
            var my_element = document.getElementById(id);
            my_element.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });

        }, 10)

    } else {
        return 
    }



}