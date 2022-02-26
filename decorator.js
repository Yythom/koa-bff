function test(target, a, b) {
    target.say = true;
}
@test
class main {

}

console.log(main.say);
