# express-rest

Express Framework를 사용한 REST API 프로젝트입니다.


</br>

# Getting Started
1. Clone the repository

    ```shell
    $ git clone git@github.com:bellti9er/express-rest.git

    $ git clone https://github.com/bellti9er/express-rest.git
    ```




2. Install dependencies

    ```shell
    $ npm install
    ```




3. Write `.env` file for your environment

    ```txt
    . . . 
    ```

3. Write also `./migrations/.env` file for your environment

    ```txt
    . . . 
    ```

4. Run the following command to apply migration files to the database.
   (this command runs on path `./migrations/`)
   
   ```shell
   $ dbmate up
   ```

5. Running tests using NPM scripts

    ```shell
    $ npm test [individual test-files]
    ```



6. Build and run the project as local server

    ```shell
    $ npm run dev
    ```

</br>

# Project Structures
해당 프로젝트는 주로 `api`, `utils`, `tests` 와 같은 디렉토리와 `app.ts`, `local-server.ts`, `database.ts` 등의 주요 파일들로 이루어져 있으며 이에 대한 설명은 아래와 같습니다. 

- `api` : 이 디렉토리는 API의 핵심 로직을 담고 있습니다. 서브 디렉토리로는 `controllers`, `services`와 `models`이 있습니다.

  - `controllers` : 엔드포인트를 통해 API를 라우팅하고, 클라이언트 인터페이스에 대한 요청과 응답을 처리합니다. 
  - `service` : 비즈니스 로직을 처리합니다.
  - `model` : 데이터베이스와의 상호작용을 처리합니다.

- `utils` : 이 디렉토리는 여러 곳에서 공통적으로 사용되는 간단한 유틸리티 코드들이 포함됩니다. (ex. Error Handling 관련 등)

- `tests` : 이 디렉토리는 테스트 코드와 관련된 모든 것을 관리합니다. 서브 디렉토리로는 `fixtures`와 `tests`가 있으며, 주요 파일로는 `test-client.ts`가 있습니다. 

  - `fixtures` : 앞으로 계속해서 작성 될 각 test의 신뢰성을 높이고, 반복성을 보장하도록 해당 서브 디렉토리를 활용하여 코드의 재사용성과 테스트 코드의 가독성 및 유지 보수성을 향상 시킵니다.
  - `tests` : 각각의 test case를 작성합니다.
  - `test-client.ts` : 테스트 환경에서 사용되는 App 인스턴스의 초기화 및 데이터베이스 작업을 수행하는데 필요한 코드를 정의합니다.

- `app.ts` : 어플리케이션의 메인 엔트리 포인트입니다. App에 대한 설정과 초기화를 담당합니다.
- `local-server.ts` : 서버를 로컬 환경에서 실행할 때 사용됩니다.
- `database.ts` : 데이터베이스 커넥팅 및 설정을 관리하고, 기존의 데이터베이스 관련 라이브러리의 기능에 더해 작업에 유용성을 추가합니다.


</br>

# Git Commit Message Template

첨부된 `.gitmessga.txt` 파일을 사용하여 git commit message에 대한 통일된 포맷을 유지할 수 있습니다.

1. 터미널을 열고 아래의 명령어를 입력하여 git이 해당 파일을 commit message template으로써 사용하도록 설정합니다.

    ```shell
    $ git config commit.template .gitmessage.txt
    ```

    위의 명령어는 current repository에만 적용되므로, 모든 repository에서 템플릿을 사용하려면 `--global` 옵션을 추가합니다.

    ```shell
    $ git config --global commit.template .gitmessage.txt 
    ```




2. 이제 commit 명령어를 실행하면 편집기가 열리면서 `.gitmessage.txt`의 내용을 활용할 수 있습니다.

    ```shell
    $ git commit
    ```

</br>
