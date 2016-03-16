<?php
abstract class Meanbee_Shippingrules_Calculator_Register_Abstract
{
    /** @var mixed[] $children */
    protected $children = array();

    /**
     * [add description]
     * @todo
     * @param  string $key   [description]
     * @param  mixed  $child [description]
     * @return $this
     */
    public function add($key, $child)
    {
        if ($this->isValidChild($child) && !$this->has($key)) {
            $this->children[strtolower($key)] = $child;
        }
        return $this;
    }

    /**
     * [remove description]
     * @todo
     * @param  string $key [description]
     * @return mixed
     */
    public function remove($key)
    {
        $child = $this->get($key);
        if (!is_null($child)) {
            unset($this->children[strtolower($key)]);
        }
        return $child;
    }

    /**
     * [has description]
     * @todo
     * @param  string  $key [description]
     * @return boolean      [description]
     */
    public function has($key)
    {
        return isset($this->children[strtolower($key)]);
    }

    /**
     * [get description]
     * @todo
     * @param  string $key [description]
     * @return mixed       [description]
     */
    public function get($key)
    {
        return $this->has($key) ? $this->children[strtolower($key)] : null;
    }

    /**
     * [find description]
     * @todo
     * @param  mixed        $child [description]
     * @return string|false        [description]
     */
    public function find($child)
    {
        return array_search($child, $this->children);
    }

    /**
     * [new description]
     * @todo
     * @param  string $key [description]
     * @return mixed       [description]
     */
    public function newInstanceOf($key, $args, $context)
    {
        if ($this->has($key)) {
            $clone = clone $this->get($key);
            $clone->init($args, $context);
            return $clone;
        }
        return null;
    }

    /**
     * [isValidChild description]
     * @todo
     * @param  mixed   $child [description]
     * @return boolean        [description]
     */
    protected abstract function isValidChild($child);
}
