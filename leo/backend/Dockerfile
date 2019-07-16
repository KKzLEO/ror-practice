FROM ruby:2.3.7

LABEL Name=backend Version=0.0.1
EXPOSE 3000

# throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config --global sfrozen 1
RUN apt-get update && \
    apt-get install -y nodejs --no-install-recommends

RUN apt-get update && \
    apt-get install -y mysql-client postgresql-client sqlite3 --no-install-recommends

WORKDIR /backend/app
COPY . /backend/app

COPY Gemfile ./
COPY Gemfile.lock ./
# RUN gem install bundler
# RUN gem install bundler && \
#     bundle update && \
#     bundle install
RUN bundle install
RUN rake db:migrate

CMD ["rails", "s"]
    