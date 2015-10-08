package hello.service;

import hello.model.Hello;

import java.util.List;

public interface HelloService {

    Hello findOne(Long id);

    List<Hello> findAll();

    Hello persist(Hello hello);

    void delete(Long id);
}
