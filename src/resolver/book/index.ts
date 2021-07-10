import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Arg,
  ID,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Author } from '@/resolver/author';
import { books, authors } from '@/model';

@ObjectType()
export class Book {
  @Field((value) => ID)
  id: number;
  @Field()
  title: string;
  @Field((value) => Author)
  author: number;
}

@Resolver(Book)
class BookResolver {
  @Query((returns) => [Book])
  async books() {
    return books;
  }
  @Query((returns) => Book)
  async book(@Arg('id', { nullable: true }) id?: number) {
    return books.find((b) => b.id === id);
  }
  @FieldResolver()
  async author(@Root() book: Book) {
    return authors.find((a) => a.id === book.author);
  }
}

export default BookResolver;
