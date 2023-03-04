class SceneManager {
    static scenes = []
    static currentSceneIndex = 0
    static changedSceneFlag = true

    static startScenes(scenes, title, options){
        SceneManager.setScenes(scenes)
        start(title, options)
    }

    static testScenes(scenes, title, options){
        SceneManager.setScenes(scenes)
        test(title, options)
    }

    static setScenes(scenes){
        //Same as addScenes, but we clear any scenes first
        SceneManager.currentSceneIndex = 0;
        SceneManager.changedScene = true;
        SceneManager.scenes = []
        SceneManager.addScenes(scenes);
    }

    static addScenes(scenes){
        for(let scene of scenes){
            SceneManager.addScene(scene);
        }
    }
    static addScene(scene) {
        SceneManager.scenes.push(scene)
    }
    static getActiveScene() {
        return SceneManager.scenes[SceneManager.currentSceneIndex];
    }
    static changeScene(index) {
        SceneManager.currentSceneIndex = index
        SceneManager.changedSceneFlag = true
    }
}

window.SceneManager = SceneManager;
