package hello.repository;

import hello.model.Hello;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * hello repository.
 */
public interface HelloRepository extends JpaRepository<Hello, Long>{

}
