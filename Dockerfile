# meedan/meedan.com-base

FROM meedan/ruby
MAINTAINER sysops@meedan.com
ENV IMAGE  meedan/meedan.com

ENV DEPLOYUSER meedandeploy
ENV DEPLOYDIR /var/www/meedan.com
ENV GITREPO git@github-meedan-com:meedan/meedan.com.git

RUN useradd ${DEPLOYUSER} -s /bin/bash -m

RUN mkdir -p ${DEPLOYDIR}

# copy in library related config modules
WORKDIR $DEPLOYDIR
COPY Gemfile ${DEPLOYDIR}/Gemfile
COPY Gemfile.lock ${DEPLOYDIR}/Gemfile.lock
COPY package.json ${DEPLOYDIR}/package.json
COPY bower.json ${DEPLOYDIR}/bower.json
COPY .bowerrc ${DEPLOYDIR}/.bowerrc

RUN chown www-data:www-data /var/www
RUN chmod 775 /var/www
RUN chmod g+s /var/www
RUN chown ${DEPLOYUSER}:www-data ${DEPLOYDIR}

# do an initial install to populate vendor_bundle, node_modules, bower_components
USER ${DEPLOYUSER}
RUN echo "gem: --no-rdoc --no-ri" > ~/.gemrc \
	&& bundle install --deployment --without development test 
RUN npm install --production
RUN bower install

# copy in the whole tree
USER root
COPY . /tmp${DEPLOYDIR}

RUN cp -avp /tmp${DEPLOYDIR} ${DEPLOYDIR}/.. \
	&& chown -R ${DEPLOYUSER}:www-data ${DEPLOYDIR}

# run middleman
USER ${DEPLOYUSER}
RUN bundle exec middleman build

ONBUILD EXPOSE 8080
CMD ["pm2","start","server.js"]
