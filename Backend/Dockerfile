FROM public.ecr.aws/lambda/nodejs:14


ARG FUNCTION_DIR="/var/task"
 
# Create function directory
RUN mkdir -p ${FUNCTION_DIR}
 
# Copy handler function and package.json
COPY SvgBuilder.js ${FUNCTION_DIR}
COPY TraitGenerator.js ${FUNCTION_DIR}
COPY HttpResponse.js ${FUNCTION_DIR}
COPY handler.js ${FUNCTION_DIR}
COPY package.json ${FUNCTION_DIR}



# Install NPM dependencies for function
RUN yum install git -y
RUN yum -y install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel librsvg2-devel bzip2-devel zlib-devel zlib

RUN npm install

# Set the CMD to your handler
CMD [ "handler.generate" ]