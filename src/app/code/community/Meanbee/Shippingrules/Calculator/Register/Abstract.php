<?php
abstract class Meanbee_Shippingrules_Calculator_Register_Abstract
{
    /** @var mixed[] $children */
    protected $children = array();

    /**
     * Appends child to register if key is free.
     * @param  string $key   Register key.
     * @param  mixed  $child Potential child.
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
     * Removes from the register an entry that has the passed key.
     * @param  string $key Register key.
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
     * Checks to see if the key is taken.
     * @param  string  $key Register key.
     * @return boolean
     */
    public function has($key)
    {
        return isset($this->children[strtolower($key)]);
    }

    /**
     * Accessor for the register entry that has the passed key.
     * @param  string $key Register key.
     * @return mixed
     */
    public function get($key)
    {
        return $this->has($key) ? $this->children[strtolower($key)] : null;
    }

    /**
     * Finds the key that the passed entry has taken.
     * @param  mixed        $child Register entry.
     * @return string|false        Register key.
     */
    public function find($child)
    {
        return array_search($child, $this->children);
    }

    /**
     * Initialises a new instance off the register entry identified by the
     * passed key
     * @param  string $key Register key.
     * @return mixed       New instance of associated entry.
     */
    public function newInstanceOf($key, $args, &$parent)
    {
        if ($this->has($key)) {
            $clone = clone $this->get($key);
            $clone->init($args, $parent);
            return $clone;
        }
        return null;
    }

    /**
     * Verifiies that the potential entry is valid for this register.
     * @todo
     * @param  mixed   $child Potential child
     * @return boolean
     */
    protected abstract function isValidChild($child);
}
