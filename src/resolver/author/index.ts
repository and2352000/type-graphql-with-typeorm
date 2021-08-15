import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Arg,
  ID,
  Root,
  FieldResolver,
  Ctx,
} from 'type-graphql';
import { authors, books } from '@/model';
import { Book } from '@/resolver/book';
@ObjectType()
export class Author {
  @Field((value) => ID)
  id: number;
  @Field()
  name: string;
  @Field((value) => [Book])
  likes: number[];
}

@Resolver(Author)
class AuthorResolver {
  @Query((returns) => [Author])
  async authors() {
    return authors;
  }
  @Query((returns) => Author)
  async author(@Arg('id', { nullable: false }) id?: number) {
    return authors.find((a) => a.id === id);
  }
  @FieldResolver()
  likes(@Root() author: Author) {
    return author.likes.map((a) => books.find((b) => a === b.id));
  }
}

export default AuthorResolver;
