function testCollectNewJobUsecase() {
  const usecase = new CollectNewJobUsecase();
  usecase.handle();
}

function testGenerateId(){
  const repository = new JobRepository();
  const id = repository.generateNextId();
  console.log(id);
}
