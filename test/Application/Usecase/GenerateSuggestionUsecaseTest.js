function testGenerateSuggestion(){
    new GenerateSuggestionUsecase().handle({action: 'generateSuggestion',id: 3},)
}