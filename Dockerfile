FROM node:lts-alpine

# Change App Directory
WORKDIR /app

# The App will be built in Code Build 
# So copy the built directories to the working directory
COPY . /app/

# Reaffirm that the PORT is 3000
ENV PORT 3000

# Expose the PORT 3000
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
