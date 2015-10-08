package hello.service;

import hello.model.Hello;
import hello.repository.HelloRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DefaultHelloService implements HelloService {


    @Resource
    private HelloRepository repository;

    @Override
    public Hello findOne(Long id) {
        return repository.findOne(id);
    }

    @Override
    public List<Hello> findAll() {
        return repository.findAll();
    }

    @Override
    public Hello persist(Hello hello) {
        return repository.save(hello);
    }

    @Override
    public void delete(Long id) {
        repository.delete(id);
    }
}
