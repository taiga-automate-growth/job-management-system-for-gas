class HtmlContentNotFoundException extends Error{
    constructor(message = ""){
        super(message);
        this.name = "HtmlContentNotFound";
    }
}