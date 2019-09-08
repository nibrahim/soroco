import sys

from bookclub import app, model

def main():
    if sys.argv[1] == 'create':
        model.db.create_all()
    if sys.argv[1] == 'develop':
        app.app.run()

if __name__ == "__main__":
    main()
