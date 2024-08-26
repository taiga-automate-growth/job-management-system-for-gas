class HtmlContentNotFoundException extends Error{
    constructor(message = ""){
        this.message = message;
        this.name = "HtmlContentNotFound";
    }
}