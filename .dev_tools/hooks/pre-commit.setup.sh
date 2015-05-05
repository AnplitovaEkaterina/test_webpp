#!/bin/sh

PROJECT_PATH=$(git rev-parse --show-toplevel)

cp $PROJECT_PATH/.dev_tools/hooks/pre-commit $PROJECT_PATH/.git/hooks/pre-commit
cp -r $PROJECT_PATH/.dev_tools/hooks/pre-commit-scripts $PROJECT_PATH/.git/hooks/
chmod +x $PROJECT_PATH/.git/hooks/pre-commit \
         $PROJECT_PATH/.git/hooks/pre-commit-scripts \
         $PROJECT_PATH/.git/hooks/pre-commit-scripts/*